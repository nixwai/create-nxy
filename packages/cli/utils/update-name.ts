import path from 'node:path';
import fs from 'fs-extra';
import { libFileMap } from '../config';

export async function updateName(projectPath: string, name: string, libs: string[]) {
  await changePackageName(projectPath, name);
  await changePackageName(`${projectPath}/packages/core`, `@${name}/build`);
  for (let i = 0; i < libs.length; i++) {
    const type = libs[i];
    await changePackageName(`${projectPath}/packages/${libFileMap[type]}`, `@${name}/${libFileMap[type]}`);
    await changePackageName(`${projectPath}/packages/core/build-${type}`, `${name}-${type}`);
  }
}

async function changePackageName(filePath: string, name: string) {
  const pkgPath = path.join(filePath, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  pkg.name = name;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
