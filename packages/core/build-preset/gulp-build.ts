import { resolve } from 'node:path';
import { series } from 'gulp';
import { copyFiles, delPath, editPackage, run } from '../tasks';
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
  () => editPackage(presetOutput, (config) => {
    config.exports = {
      '.': {
        types: './types/index.d.ts',
        import: './dist/index.js',
      },
      './helper': {
        types: './types/helper.d.ts',
        import: './dist/helper.js',
      },
    };
  }),
);
