import { parallel, series } from 'gulp';
import { designOutput } from '../paths';
import { delPath, run } from '../tasks';

export default series(
  () => delPath(designOutput),
  parallel(
    () => run('vite build'),
  ),
);
