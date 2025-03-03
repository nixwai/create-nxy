import path from 'node:path';
import fs from 'fs-extra';
import { libFileMap } from '../config';

const scriptTypes = ['release', 'build', 'publish'];

export async function updatePackages(projectPath: string, name: string, libs: string[], format: number) {
  // 更新包名
  await changePackage(projectPath, { name: `@${name}/monorepo` });
  await changePackage(`${projectPath}/packages/core`, { name: `@${name}/core` });
  for (let i = 0; i < libs.length; i++) {
    const type = libs[i];
    const libName = format === 0 ? `@${name}/${type}` : `${name}-${type}`;
    await changePackage(`${projectPath}/packages/${libFileMap[type]}`, { name: libName });
    // 添加工作空间库包
    await changePackage(projectPath, { dependencies: { [libName]: 'workspace:*' } });
  }
  // 移除脚本命令
  await removePackageScripts(projectPath, 'cli');
  await removePackageScripts(`${projectPath}/packages/core`, 'cli');
  for (const type in libFileMap) {
    if (!libs.includes(type)) {
      await removePackageScripts(projectPath, type);
      await removePackageScripts(`${projectPath}/packages/core`, type);
    }
  }
}

/** 修改package.json中的配置 */
export async function changePackage(filePath: string, config: Record<string, any>) {
  try {
    const pkgPath = path.join(filePath, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return;
    }
    const pkg = await fs.readJson(pkgPath);
    Object.keys(config).forEach((key) => {
      if (typeof pkg[key] === 'object') {
        Object.assign(pkg[key], config[key]);
      }
      else {
        pkg[key] = config[key];
      }
    });
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
  catch (error) {
    console.error('Error editing package.json:', error);
  }
}

/** 移除package.json中的scripts命令 */
async function removePackageScripts(filePath: string, name: string) {
  const pkgPath = path.join(filePath, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return;
  }
  const pkg = await fs.readJson(pkgPath);
  // 如果scripts字段不存在，直接返回
  if (!pkg.scripts) {
    return;
  }
  const scripts = scriptTypes.map(type => `${name}:${type}`);
  // 移除指定的脚本命令
  scripts.forEach((script) => {
    if (pkg.scripts[script]) {
      delete pkg.scripts[script];
    }
  });
  // 如果scripts对象为空，则删除整个scripts字段
  if (Object.keys(pkg.scripts).length === 0) {
    delete pkg.scripts;
  }
  // 写回package.json
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
