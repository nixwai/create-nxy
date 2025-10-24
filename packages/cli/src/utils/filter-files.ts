import fs from 'fs-extra';
import { sync } from 'glob';
import { libFileMap } from '../config';

export async function filterFiles(projectPath: string, libs: string[]) {
  await deleteFiles(`${projectPath}/.git`);
  await deleteFiles(`${projectPath}/pnpm-lock.yaml`);
  await deleteFiles(`${projectPath}/packages/cli`);
  await deleteFiles(`${projectPath}/packages/build-system/build-cli-system`);
  for (const type in libFileMap) {
    if (!libs.includes(type)) {
      await deleteFiles(`${projectPath}/packages/${libFileMap[type]}`);
      await deleteFiles(`${projectPath}/packages/build-system/build-${libFileMap[type]}`);
    }
  }
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
