import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const buildCliRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildCliRoot, '../..');
const cliRoot = resolve(projRoot, 'packages/cli');
const cliOutput = resolve(cliRoot, 'dist');

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
