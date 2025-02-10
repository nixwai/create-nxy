import { parallel, series } from 'gulp';
import { delPath, run } from '../tasks';
import { useOutput } from './paths';

export default series(
  () => delPath(useOutput),
  parallel(
    () => run('vite build'),
  ),
);
