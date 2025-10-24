import { resolve } from 'node:path';
import { series } from 'gulp';
import { delPath, run } from '../tasks';
import { cliOutput } from './paths';

export default series(
  () => delPath(resolve(cliOutput)),
  () => run('vite build'),
);
