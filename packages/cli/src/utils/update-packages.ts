import fs from 'fs-extra';
import {
  cssPackageDependencies,
  cssPackageScripts,
  cssPreset,
  featureFileMap,
  featureScriptMap,
  libFileMap,
} from '../config';
import { editPackage } from '../tasks';

export async function updatePackages(
  projectPath: string,
  name: string,
  libs: string[],
  format: number,
  features: string[] = [],
) {
  // 更新包名
  await changePackageName(projectPath, { name: `@${name}/monorepo` });
  await changePackageName(`${projectPath}/tooling`, { name: `@${name}/tooling` });
  for (let i = 0; i < libs.length; i++) {
    const type = libs[i];
    const libFile = libFileMap[type];
    await changePackageName(`${projectPath}/tooling/${libFile}`, { name: `@${name}/build-${libFile}` });
    const libType = type === 'icon' ? 'icons-vue' : type;
    const libName = format === 0 ? `@${name}/${libType}` : `${name}-${libType}`;
    await changePackageName(`${projectPath}/packages/${libFile}`, { name: libName });
    // 添加工作空间库包
    await changePackageName(projectPath, { dependencies: { [libName]: 'workspace:*' } });
  }
  // 移除脚本命令
  await removePackageScripts(projectPath, 'cli:');
  await removePackageScripts(`${projectPath}/tooling`, 'cli:');
  for (const type in libFileMap) {
    if (!libs.includes(type)) {
      await removePackageScripts(projectPath, type);
      await removePackageScripts(`${projectPath}/tooling`, `${type}:`);
    }
  }
  for (const type in featureScriptMap) {
    if (!features.includes(type)) {
      await removePackageScripts(projectPath, `${featureScriptMap[type]}:`);
    }
  }
  if (!features.includes(cssPreset)) {
    await removePackageScriptKeys(projectPath, cssPackageScripts);
    await removePackageDependencies(projectPath, cssPackageDependencies);
  }
  // 修改打包全部的脚本命令
  if (libs.length) {
    await updateBuildScripts(projectPath, libs);
  }
  else {
    await removePackageScriptKeys(projectPath, ['build']);
  }
  await removeWorkspacePackages(
    projectPath,
    Object.keys(featureFileMap)
      .filter(type => !features.includes(type))
      .map(type => featureFileMap[type]),
  );
}

/** 移除工作空间包 */
async function removeWorkspacePackages(projectPath: string, packages: string[]) {
  if (packages.length === 0) {
    return;
  }

  const workspacePath = `${projectPath}/pnpm-workspace.yaml`;
  if (!await fs.pathExists(workspacePath)) {
    return;
  }

  const packageSet = new Set(packages);
  const content = await fs.readFile(workspacePath, 'utf8');
  const nextContent = content
    .split(/\r?\n/)
    .filter((line: string) => {
      const match = line.match(/^\s*-\s+(.+)\s*/);
      return !match || !packageSet.has(match[1]);
    })
    .join('\n');

  await fs.writeFile(workspacePath, nextContent.endsWith('\n') ? nextContent : `${nextContent}\n`);
}

/** 同步 tooling 的 build 脚本 */
async function updateBuildScripts(projectPath: string, libs: string[]) {
  const buildScripts = libs.map(type => `${type}:build`);
  return editPackage(`${projectPath}/tooling`, (pkg) => {
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.build = `run-p ${buildScripts.join(' ')}`;
  });
}

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
    // 移除指定的脚本命令
    for (const key in pkg.scripts) {
      if (key.startsWith(`${name}`)) {
        delete pkg.scripts[key];
      }
    }
    // 如果scripts对象为空，则删除整个scripts字段
    if (Object.keys(pkg.scripts).length === 0) {
      delete pkg.scripts;
    }
  });
}

/** 移除package.json中的指定scripts命令 */
function removePackageScriptKeys(filePath: string, names: string[]) {
  return editPackage(filePath, (pkg) => {
    if (!pkg.scripts) {
      return;
    }

    names.forEach((name) => {
      delete pkg.scripts[name];
    });

    if (Object.keys(pkg.scripts).length === 0) {
      delete pkg.scripts;
    }
  });
}

/** 移除package.json中的指定依赖 */
function removePackageDependencies(filePath: string, names: string[]) {
  return editPackage(filePath, (pkg) => {
    ['dependencies', 'devDependencies'].forEach((key) => {
      if (!pkg[key]) {
        return;
      }

      names.forEach((name) => {
        delete pkg[key][name];
      });

      if (Object.keys(pkg[key]).length === 0) {
        delete pkg[key];
      }
    });
  });
}
