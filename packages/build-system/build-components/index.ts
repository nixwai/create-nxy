import { series } from 'gulp';
import { version } from '../../components/package.json';
import { delPath, publishTask, releaseTask, run } from '../tasks';
import { designOutput, designRoot } from './paths';

export const release = series(
  () => releaseTask('design', designRoot),
);

export const build = series(
  () => delPath(designOutput),
  () => run('vite build'),
);

export const publish = series(
  () => publishTask(version, designRoot),
);
