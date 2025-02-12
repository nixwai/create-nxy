import { parallel, series } from 'gulp';
import { delPath, run } from '../tasks';
import { cliOutput } from './paths';

export default series(
  () => delPath(cliOutput),
  parallel(
    () => run('vite build'),
  ),
);
