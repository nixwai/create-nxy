import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, run } from '../tasks';
import { toolOutput, toolRoot } from './paths';

export default series(
  () => delPath(toolOutput),
  () => run('vite build'),
  () => copyFiles(
    toolOutput,
    [
      resolve(toolRoot, 'README.md'),
      resolve(toolRoot, 'package.json'),
    ],
  ),
);
