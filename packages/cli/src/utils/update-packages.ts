import { libFileMap } from '../config';
import { editPackage } from '../tasks';

const scriptTypes = ['release', 'build', 'publish'];

export async function updatePackages(projectPath: string, name: string, libs: string[], format: number) {
  // 更新包名
  await changePackageName(projectPath, { name: `@${name}/monorepo` });
  await changePackageName(`${projectPath}/packages/build-system`, { name: `@${name}/build-system` });
  for (let i = 0; i < libs.length; i++) {
    const type = libs[i];
    const libFile = libFileMap[type];
    await changePackageName(`${projectPath}/packages/build-system/build-${libFile}`, { name: `@${name}/build-${libFile}` });
    const libName = format === 0 ? `@${name}/${type}` : `${name}-${type}`;
    await changePackageName(`${projectPath}/packages/${libFile}`, { name: libName });
    // 添加工作空间库包
    await changePackageName(projectPath, { dependencies: { [libName]: 'workspace:*' } });
  }
  // 移除脚本命令
  await removePackageScripts(projectPath, 'cli');
  await removePackageScripts(`${projectPath}/packages/build-system`, 'cli');
  for (const type in libFileMap) {
    if (!libs.includes(type)) {
      await removePackageScripts(projectPath, type);
      await removePackageScripts(`${projectPath}/packages/build-system`, type);
    }
  }
  // 修改打包全部的脚本命令
  await editPackage(projectPath, (pkg) => {
    if (pkg.scripts) {
      pkg.scripts.build = libs.map(type => `pnpm build:${type}`).join(' & ');
    }
  });
}

/** 修改package.json中的配置 */
function changePackageName(filePath: string, config: Record<string, any>) {
  return editPackage(filePath, (pkg) => {
    Object.keys(config).forEach((key) => {
      if (typeof pkg[key] === 'object') {
        Object.assign(pkg[key], config[key]);
      }
      else {
        pkg[key] = config[key];
      }
    });
  });
}

/** 移除package.json中的scripts命令 */
function removePackageScripts(filePath: string, name: string) {
  return editPackage(filePath, (pkg) => {
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
  });
}
