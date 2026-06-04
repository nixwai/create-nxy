import { series } from 'gulp';
import { version } from '../../packages/components/package.json';
import { delPath, publishTask, releaseTask, runBuildCommand, runBuildSteps } from '../common/tasks';
import { designOutput, designRoot } from './paths';

export const release = series(
  () => releaseTask('design', designRoot),
);

export function build() {
  return runBuildSteps('design build', [
    { name: 'clean dist', run: () => delPath(designOutput) },
    { name: 'bundle with tsdown', run: () => runBuildCommand('tsdown --config tsdown.config.ts') },
  ]);
}

export const publish = series(
  () => publishTask(version, designRoot),
);
