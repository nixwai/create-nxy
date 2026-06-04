import { series } from 'gulp';
import { version } from '../../packages/hooks/package.json';
import { delPath, publishTask, releaseTask, run } from '../common/tasks';
import { useOutput, useRoot } from './paths';

export const release = series(
  () => releaseTask('use', useRoot),
);

export const build = series(
  () => delPath(useOutput),
  () => run('tsdown --config tsdown.config.ts'),
);

export const publish = series(
  () => publishTask(version, useRoot),
);
