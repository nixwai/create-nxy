import { series } from 'gulp';
import { version } from '../../packages/presets/package.json';
import { delPath, publishTask, releaseTask, run } from '../common/tasks';
import { presetOutput, presetRoot } from './paths';

export const release = series(
  () => releaseTask('preset', presetRoot),
);

export const build = series(
  () => delPath(presetOutput),
  () => run('tsdown --config tsdown.config.ts'),
);

export const publish = series(
  () => publishTask(version, presetRoot),
);
