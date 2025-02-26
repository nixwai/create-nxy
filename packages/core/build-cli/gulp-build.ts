import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, run } from '../tasks';
import { cliOutput, cliRoot } from './paths';

export default series(
  () => delPath(cliOutput),
  () => run('vite build'),
  () => copyFiles(
    cliOutput,
    [
      resolve(cliRoot, 'README.md'),
      resolve(cliRoot, 'package.json'),
    ],
  ),
);
