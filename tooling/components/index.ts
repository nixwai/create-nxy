import { series } from 'gulp';
import { version } from '../../packages/components/package.json';
import { delPath, publishTask, releaseTask, run } from '../common/tasks';
import { designOutput, designRoot } from './paths';

export const release = series(
  () => releaseTask('design', designRoot),
);

export const build = series(
  () => delPath(designOutput),
  () => run('tsdown --config tsdown.config.ts'),
);

export const publish = series(
  () => publishTask(version, designRoot),
);
