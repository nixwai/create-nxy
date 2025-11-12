import { series } from 'gulp';
import { version } from '../../hooks/package.json';
import { delPath, publishTask, releaseTask, run } from '../tasks';
import { useOutput, useRoot } from './paths';

export const release = series(
  () => releaseTask('use', useRoot),
);

export const build = series(
  () => delPath(useOutput),
  () => run('vite build'),
);

export const publish = series(
  () => publishTask(version, useRoot),
);
