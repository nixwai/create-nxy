import type { VersionBumpOptions } from 'bumpp';
import { versionBump } from 'bumpp';

export interface ReleaseOptions {
  cwd: string
  files?: readonly string[]
  scope?: string
}

export function createReleaseOptions(options: ReleaseOptions): VersionBumpOptions {
  const { cwd, files, scope } = options;

  return {
    commit: scope
      ? `chore(${scope}): release v{version}`
      : 'chore: release v{version}',
    confirm: true,
    cwd,
    noGitCheck: true,
    push: true,
    ...(files ? { files: [...files] } : {}),
    tag: scope ? `v{version}(${scope})` : 'v{version}',
  };
}

export async function releaseTask(scope: string, rootPath: string) {
  return versionBump(createReleaseOptions({ cwd: rootPath, scope }));
}

export async function releasePackagesTask(rootPath: string) {
  return versionBump(createReleaseOptions({
    cwd: rootPath,
    files: ['packages/**/package.json'],
  }));
}
