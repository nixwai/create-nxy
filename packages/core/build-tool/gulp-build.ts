import { parallel, series } from 'gulp';
import { toolOutput } from '../paths';
import { delPath, run } from '../tasks';

export default series(
  () => delPath(toolOutput),
  parallel(
    () => run('vite build'),
  ),
);
