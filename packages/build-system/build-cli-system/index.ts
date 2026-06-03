import { series } from 'gulp';
import { version } from '../../cli/package.json';
import { delPath, publishTask, releaseTask, run } from '../tasks';
import { cliOutput, cliRoot } from './paths';

export const release = series(
  () => releaseTask('cli', cliRoot),
);

export const build = series(
  () => delPath(cliOutput),
  () => run('tsdown --config tsdown.config.ts', __dirname),
);

export const publish = series(
  () => publishTask(version, cliRoot),
);
