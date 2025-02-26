import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, run } from '../tasks';
import { designOutput, designRoot } from './paths';

export default series(
  () => delPath(designOutput),
  () => run('vite build'),
  () => copyFiles(
    designOutput,
    [
      resolve(designRoot, 'README.md'),
      resolve(designRoot, 'package.json'),
      resolve(designRoot, 'global.d.ts'),
    ],
  ),
);
