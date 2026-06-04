import { series } from 'gulp';
import { version } from '../../packages/cli/package.json';
import { delPath, publishTask, releaseTask, runBuildCommand, runBuildSteps } from '../common/tasks';
import { cliOutput, cliRoot } from './paths';

export const release = series(
  () => releaseTask('cli', cliRoot),
);

export function build() {
  return runBuildSteps('cli build', [
    { name: 'clean dist', run: () => delPath(cliOutput) },
    { name: 'bundle with tsdown', run: () => runBuildCommand('tsdown --config tsdown.config.ts') },
  ]);
}

export const publish = series(
  () => publishTask(version, cliRoot),
);
