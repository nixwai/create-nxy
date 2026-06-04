import { series } from 'gulp';
import { version } from '../../packages/cli/package.json';
import { delPath, publishTask, releaseTask, run } from '../common/tasks';
import { cliOutput, cliRoot } from './paths';

export const release = series(
  () => releaseTask('cli', cliRoot),
);

export const build = series(
  () => delPath(cliOutput),
  () => run('tsdown --config tsdown.config.ts'),
);

export const publish = series(
  () => publishTask(version, cliRoot),
);
