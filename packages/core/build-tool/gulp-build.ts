import { parallel, series } from 'gulp';
import { delPath, run } from '../tasks';
import { toolOutput } from './paths';

export default series(
  () => delPath(toolOutput),
  parallel(
    () => run('vite build'),
  ),
);
