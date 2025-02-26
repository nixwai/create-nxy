import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, run } from '../tasks';
import { useOutput, useRoot } from './paths';

export default series(
  () => delPath(useOutput),
  () => run('vite build'),
  () => copyFiles(
    useOutput,
    [
      resolve(useRoot, 'README.md'),
      resolve(useRoot, 'package.json'),
    ],
  ),
);
