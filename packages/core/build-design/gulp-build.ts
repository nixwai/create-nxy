import { parallel, series } from 'gulp';
import { delPath, run } from '../tasks';
import { designOutput } from './paths';

export default series(
  () => delPath(designOutput),
  parallel(
    () => run('vite build'),
  ),
);
