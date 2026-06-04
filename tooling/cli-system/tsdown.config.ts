import { defineConfig } from 'tsdown';
import { cliOutput, cliRoot } from './paths.ts';

export default defineConfig({
  cwd: cliRoot,
  entry: { index: 'src/index.ts' },
  platform: 'node',
  clean: false,
  dts: false,
  outDir: cliOutput,
  format: 'esm',
  outExtensions: () => ({ js: '.js' }),
  deps: {
    neverBundle: [
      'fs-extra',
      'glob',
      'chalk',
      'ora',
      'prompts',
      'simple-git',
    ],
  },
  banner: '#!/usr/bin/env node',
  outputOptions: { exports: 'named' },
});
