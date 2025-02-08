import { parallel, series } from 'gulp';
import { useOutput } from '../paths';
import { delPath, run } from '../tasks';

export default series(
  () => delPath(useOutput),
  parallel(
    () => run('vite build'),
  ),
);
