import { series } from 'gulp';
import { version } from '../../packages/utils/package.json';
import { delPath, publishTask, releaseTask, run } from '../common/tasks';
import { toolOutput, toolRoot } from './paths';

export const release = series(
  () => releaseTask('tool', toolRoot),
);

export const build = series(
  () => delPath(toolOutput),
  () => run('tsdown --config tsdown.config.ts'),
);

export const publish = series(
  () => publishTask(version, toolRoot),
);
