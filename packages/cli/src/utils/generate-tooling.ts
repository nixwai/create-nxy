import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import fs from 'fs-extra';
import { libFileMap } from '../config';
import { filterFiles } from './filter-files';
import { gitClone } from './git-clone';
import { updatePackages } from './update-packages';

interface GenerateToolingOptions {
  remote: string
  targetPath: string
  hasTooling: boolean
  lib: string
  pkgDirName: string
  targetDirName: string
}

interface Replacement {
  search: string
  replace: string
}

/** 生成或追加 tooling 打包配置 */
export async function generateTooling(options: GenerateToolingOptions) {
  const targetPath = resolve(options.targetPath);
  const defaultDirName = getLibDirName(options.lib);
  await assertTargetPath(targetPath, options.hasTooling, defaultDirName);
  assertPathSegment('pkg 根目录名称', options.pkgDirName);
  assertPathSegment('打包目标库文件夹名称', options.targetDirName);

  const tempRoot = await fs.mkdtemp(join(tmpdir(), 'create-nxy-'));
  const templatePath = resolve(tempRoot, 'template');

  try {
    // 先在临时目录生成一份裁剪后的模板，再复制到目标项目，避免中途污染目标目录。
    await gitClone(options.remote, templatePath);
    await filterFiles(templatePath, [options.lib], []);
    await updatePackages(templatePath, await getProjectName(targetPath), [options.lib], 0, []);
    await updateToolingPaths(
      templatePath,
      defaultDirName,
      options.pkgDirName.trim(),
      options.targetDirName.trim(),
    );
    await copyTooling(templatePath, targetPath, defaultDirName, options.hasTooling);
  }
  finally {
    // 无论成功或失败都清理临时模板。
    await fs.remove(tempRoot);
  }
}

/** 校验目标目录与 tooling 目录状态，避免覆盖已有配置 */
async function assertTargetPath(targetPath: string, hasTooling: boolean, defaultDirName: string) {
  const stat = await fs.stat(targetPath).catch(() => null);
  if (!stat?.isDirectory()) {
    throw new Error(`已有项目路径不存在或不是目录：${targetPath}`);
  }

  const toolingPath = resolve(targetPath, 'tooling');
  const toolingStat = await fs.stat(toolingPath).catch(() => null);
  if (hasTooling && !toolingStat?.isDirectory()) {
    throw new Error(`目标项目不存在 tooling 目录：${toolingPath}`);
  }
  if (!hasTooling && toolingStat) {
    throw new Error(`目标项目已存在 tooling 目录，为避免覆盖请先处理：${toolingPath}`);
  }
  if (hasTooling && await fs.pathExists(resolve(toolingPath, defaultDirName))) {
    throw new Error(`目标 tooling 已存在该打包库目录：${resolve(toolingPath, defaultDirName)}`);
  }
}

/** 将用户选择的库类型映射为模板里的 tooling 目录名 */
function getLibDirName(lib: string) {
  const defaultDirName = libFileMap[lib];
  if (!defaultDirName) {
    throw new Error(`未知的打包工具：${lib}`);
  }
  return defaultDirName;
}

/** 目录名只允许单级路径，避免写出目标项目范围 */
function assertPathSegment(label: string, value: string) {
  const name = value.trim();
  if (!name || name === '.' || name === '..' || /[<>:"|?*\\/']/.test(name)) {
    throw new Error(`${label}必须是有效的单级目录名称`);
  }
}

/** 优先使用目标项目 package.json 的 name，缺失时回退到目录名 */
async function getProjectName(targetPath: string) {
  const packagePath = resolve(targetPath, 'package.json');
  if (await fs.pathExists(packagePath)) {
    const pkg = await fs.readJson(packagePath);
    if (typeof pkg.name === 'string' && pkg.name.trim()) {
      return normalizeProjectName(pkg.name);
    }
  }
  return normalizeProjectName(basename(targetPath) || 'project');
}

/** 生成可用于包名前缀的项目名 */
function normalizeProjectName(name: string) {
  const scopedName = name.match(/^@[^/]+\/(.+)$/)?.[1] || name;
  return scopedName.replace(/^@/, '').replace(/[^\w.-]/g, '-');
}

/** 根据用户输入改写模板内的 pkg 根目录和目标库目录 */
async function updateToolingPaths(
  templatePath: string,
  defaultDirName: string,
  pkgDirName: string,
  targetDirName: string,
) {
  const toolingPath = resolve(templatePath, 'tooling');
  await replaceInFile(resolve(toolingPath, 'common/paths.ts'), [
    {
      search: `resolve(projRoot, 'packages')`,
      replace: `resolve(projRoot, '${pkgDirName}')`,
    },
  ]);
  await replaceInFile(resolve(toolingPath, `${defaultDirName}/paths.ts`), [
    {
      search: `createModulePaths('${defaultDirName}')`,
      replace: `createModulePaths('${targetDirName}')`,
    },
  ]);
  await replaceInFile(resolve(toolingPath, `${defaultDirName}/tsdown.config.ts`), [
    {
      search: `'packages/${defaultDirName}'`,
      replace: `'${pkgDirName}/${targetDirName}'`,
    },
  ]);
  await replaceInFile(resolve(toolingPath, `${defaultDirName}/index.ts`), [
    {
      search: `../../packages/${defaultDirName}/package.json`,
      replace: `../../${pkgDirName}/${targetDirName}/package.json`,
    },
  ]);
}

/** 追加到已有 tooling 时，同步 common/paths.ts 的 pkg 根目录 */
async function updateExistingCommonPaths(toolingPath: string, pkgDirName: string) {
  const commonPaths = resolve(toolingPath, 'common/paths.ts');
  if (!await fs.pathExists(commonPaths)) {
    return;
  }

  let content = await fs.readFile(commonPaths, 'utf8');
  const pattern = /export const pkgRoot = resolve\(projRoot, ['"][^'"]+['"]\);/;
  if (!pattern.test(content)) {
    throw new Error(`未找到需要替换的pkg根目录配置：${commonPaths}`);
  }
  content = content.replace(
    pattern,
    `export const pkgRoot = resolve(projRoot, '${pkgDirName}');`,
  );
  await fs.writeFile(commonPaths, content, 'utf8');
}

/** 对模板文件做受控文本替换，没命中时直接报错 */
async function replaceInFile(filePath: string, replacements: Replacement[]) {
  let content = await fs.readFile(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    if (!content.includes(search)) {
      throw new Error(`未找到需要替换的路径：${search}`);
    }
    content = content.split(search).join(replace);
  }
  await fs.writeFile(filePath, content, 'utf8');
}

/** 根据用户选择复制完整 tooling，或追加单个打包库到已有 tooling */
async function copyTooling(
  templatePath: string,
  targetPath: string,
  defaultDirName: string,
  hasTooling: boolean,
) {
  const sourceTooling = resolve(templatePath, 'tooling');
  const targetTooling = resolve(targetPath, 'tooling');
  if (!hasTooling) {
    // 新项目模式：直接复制整套 tooling。
    await fs.copy(sourceTooling, targetTooling, {
      overwrite: false,
      errorOnExist: true,
    });
    return;
  }

  // 已有 tooling 模式：合并公共配置和 package，再复制选中的库目录。
  await mergeToolingPackage(
    resolve(sourceTooling, 'package.json'),
    resolve(targetTooling, 'package.json'),
  );
  await copyCommon(sourceTooling, targetTooling);
  await updateExistingCommonPaths(targetTooling, await getPkgDirName(sourceTooling));
  await fs.copy(resolve(sourceTooling, defaultDirName), resolve(targetTooling, defaultDirName), {
    overwrite: false,
    errorOnExist: true,
  });
}

/** 从临时模板的 common/paths.ts 中读取已经改写后的 pkg 目录名 */
async function getPkgDirName(sourceTooling: string) {
  const commonPaths = await fs.readFile(resolve(sourceTooling, 'common/paths.ts'), 'utf8');
  const match = commonPaths.match(/export const pkgRoot = resolve\(projRoot, ['"]([^'"]+)['"]\);/);
  if (!match) {
    throw new Error(`未找到pkg根目录配置：${resolve(sourceTooling, 'common/paths.ts')}`);
  }
  return match[1];
}

/** 目标 tooling 没有 common 时，从模板补齐 common 目录 */
async function copyCommon(sourceTooling: string, targetTooling: string) {
  const targetCommon = resolve(targetTooling, 'common');
  if (await fs.pathExists(targetCommon)) {
    return;
  }
  await fs.copy(resolve(sourceTooling, 'common'), targetCommon, {
    overwrite: false,
    errorOnExist: true,
  });
}

/** 合并 tooling/package.json，保留目标项目已有配置 */
async function mergeToolingPackage(sourcePath: string, targetPath: string) {
  const sourcePkg = await fs.readJson(sourcePath);
  if (!await fs.pathExists(targetPath)) {
    await fs.writeJson(targetPath, sourcePkg, { spaces: 2 });
    return;
  }

  const targetPkg = await fs.readJson(targetPath);
  mergePackageScripts(sourcePkg, targetPkg);
  mergePackageDependencies(sourcePkg, targetPkg, 'dependencies');
  mergePackageDependencies(sourcePkg, targetPkg, 'devDependencies');
  for (const key of ['type', 'version']) {
    if (!targetPkg[key] && sourcePkg[key]) {
      targetPkg[key] = sourcePkg[key];
    }
  }
  await fs.writeJson(targetPath, targetPkg, { spaces: 2 });
}

/** 合并脚本，模板脚本优先 */
function mergePackageScripts(sourcePkg: Record<string, any>, targetPkg: Record<string, any>) {
  if (!sourcePkg.scripts) {
    return;
  }
  targetPkg.scripts = {
    ...targetPkg.scripts,
    ...sourcePkg.scripts,
  };
}

/** 合并依赖时优先保留目标项目已有版本 */
function mergePackageDependencies(sourcePkg: Record<string, any>, targetPkg: Record<string, any>, key: string) {
  if (!sourcePkg[key]) {
    return;
  }
  targetPkg[key] = {
    ...sourcePkg[key],
    ...targetPkg[key],
  };
}
