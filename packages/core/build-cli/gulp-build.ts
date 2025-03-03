import { resolve } from 'node:path';
import { series } from 'gulp';
import { delPath, run } from '../tasks';
import { cliRoot } from './paths';

export default series(
  () => delPath(resolve(cliRoot, 'index.mjs')),
  () => run('vite build'),
);
