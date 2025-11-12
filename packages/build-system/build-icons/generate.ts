import type { BuiltInParserName } from 'prettier';
import path from 'node:path';
import camelcase from 'camelcase';
import glob from 'fast-glob';
import { emptyDir, ensureDir, readFile, writeFile } from 'fs-extra';
import { format } from 'prettier';
import { pathComponents, pathSvg } from './paths';

/** 获取 svg 文件 */
function getSvgFiles() {
  return glob('*.svg', { cwd: pathSvg, absolute: true });
}

/**
 * 从文件路径中获取文件名及组件名
 * @param file 文件路径
 * @returns 文件名及组件名
 */
function getName(file: string) {
  const fileName = path.basename(file).replace('.svg', ''); // 获取文件名
  const componentName = camelcase(fileName, { pascalCase: true }); // 转换为驼峰命名，作为组件名
  return {
    fileName,
    componentName,
  };
}

/**
 * 按照给定解析器格式化代码
 * @param code 待格式化代码
 * @param parser 解析器类型
 * @returns 格式化后的代码
 */
function formatCode(code: string, parser: BuiltInParserName = 'typescript') {
  return format(code, {
    parser,
    semi: false,
    trailingComma: 'none',
    singleQuote: true,
  });
}

/**
 * 将 svg file 转换为 vue 组件
 * @param file 待转换的 file 路径
 */
async function transformToVueComponent(file: string) {
  const content = await readFile(file, 'utf-8');
  const { fileName, componentName } = getName(file);

  const vue = await formatCode(
    `
    <script lang="ts" setup>
    defineOptions({
      name: ${JSON.stringify(componentName)}
    })
    </script>

    <template>
      ${content}
    </template>
    `,
    'vue',
  );

  writeFile(path.resolve(pathComponents, `${fileName}.vue`), vue, 'utf-8');
}

/** 生成组件入口文件 */
async function generateEntry(files: string[]) {
  const code = await formatCode(
    files
      .map((file) => {
        const { fileName, componentName } = getName(file);
        return `export { default as ${componentName} } from './${fileName}.vue'`;
      })
      .join('\n'),
  );
  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8');
}

export async function generateIconComp() {
  await ensureDir(pathComponents);
  await emptyDir(pathComponents);
  const files = await getSvgFiles();
  await Promise.all(files.map(file => transformToVueComponent(file)));
  await generateEntry(files);
}
