import { series } from 'gulp';
import { projRoot } from './paths';
import { releasePackagesTask } from './tasks';

export const release = series(
  () => releasePackagesTask(projRoot),
);
