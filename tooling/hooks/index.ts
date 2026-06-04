import { series } from 'gulp';
import { version } from '../../packages/hooks/package.json';
import { delPath, publishTask, releaseTask, runBuildCommand, runBuildSteps } from '../common/tasks';
import { useOutput, useRoot } from './paths';

export const release = series(
  () => releaseTask('use', useRoot),
);

export function build() {
  return runBuildSteps('use build', [
    { name: 'clean dist', run: () => delPath(useOutput) },
    { name: 'bundle with tsdown', run: () => runBuildCommand('tsdown --config tsdown.config.ts') },
  ]);
}

export const publish = series(
  () => publishTask(version, useRoot),
);
