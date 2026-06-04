import fs from 'fs-extra';
import { sync } from 'glob';
import { cssConfigFiles, cssPreset, featureFileMap, libFileMap } from '../config';

export async function filterFiles(projectPath: string, libs: string[] = [], features: string[] = []) {
  const deletePaths = [
    `${projectPath}/.git`,
    `${projectPath}/pnpm-lock.yaml`,
    `${projectPath}/packages/cli`,
    `${projectPath}/tooling/cli-system`,
  ];
  for (const type in libFileMap) {
    if (!libs.includes(type)) {
      deletePaths.push(
        `${projectPath}/packages/${libFileMap[type]}`,
        `${projectPath}/tooling/${libFileMap[type]}`,
      );
    }
  }
  for (const type in featureFileMap) {
    if (!features.includes(type)) {
      deletePaths.push(`${projectPath}/${featureFileMap[type]}`);
    }
  }
  if (!features.includes(cssPreset)) {
    deletePaths.push(...cssConfigFiles.map(file => `${projectPath}/${file}`));
  }
  await Promise.all(deletePaths.map(deleteFiles));
}

async function deleteFiles(filePath: string) {
  // 使用glob匹配可能包含通配符的路径
  const matches = sync(filePath, {
    dot: true, // 包含以点开头的文件
    nodir: false, // 包含目录
    absolute: true, // 返回绝对路径
  });

  // 并行删除所有匹配项
  await Promise.all(
    matches.map(async (match) => {
      try {
        await fs.remove(match);
      }
      catch (err) {
        console.error(`⚠️ 删除失败: ${match}`, err);
      }
    }),
  );
}
