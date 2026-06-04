import { series } from 'gulp';
import { version } from '../../packages/icons/package.json';
import { delPath, publishTask, releaseTask, runBuildCommand, runBuildSteps } from '../common/tasks';
import { generateIconComp } from './generate';
import { iconOutput, iconRoot } from './paths';

export const generate = series(
  () => generateIconComp(),
);

export const release = series(
  () => releaseTask('icon', iconRoot),
);

export function build() {
  return runBuildSteps('icon build', [
    { name: 'generate icon components', run: () => generateIconComp() },
    { name: 'clean dist', run: () => delPath(iconOutput) },
    { name: 'bundle with tsdown', run: () => runBuildCommand('tsdown --config tsdown.config.ts') },
  ]);
}

export const publish = series(
  () => publishTask(version, iconRoot),
);
