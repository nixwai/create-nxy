import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, run } from '../tasks';
import { presetOutput, presetRoot } from './paths';

export default series(
  () => delPath(presetOutput),
  () => run('vite build'),
  () => copyFiles(
    presetOutput,
    [
      resolve(presetRoot, 'README.md'),
      resolve(presetRoot, 'package.json'),
    ],
  ),
);
