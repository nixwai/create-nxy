import { resolve } from 'node:path';
import { projRoot } from '../common/paths.ts';
import { runBuildJobs } from '../common/tasks';

const toolingRoot = resolve(projRoot, 'tooling');

export function build() {
  return runBuildJobs('workspace build', [
    { name: 'design', command: 'pnpm run design:build', cwd: toolingRoot },
    { name: 'use', command: 'pnpm run use:build', cwd: toolingRoot },
    { name: 'tool', command: 'pnpm run tool:build', cwd: toolingRoot },
    { name: 'preset', command: 'pnpm run preset:build', cwd: toolingRoot },
    { name: 'icon', command: 'pnpm run icon:build', cwd: toolingRoot },
    { name: 'cli', command: 'pnpm run cli:build', cwd: toolingRoot },
  ]);
}
