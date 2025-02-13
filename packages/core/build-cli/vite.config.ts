import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { copyPlugin } from '../vite-configs';
import { cliOutput } from './paths';

const entryIndex = resolve(__dirname, './index.ts');

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: { entry: { index: entryIndex } },
    rollupOptions: {
      external: [
        'fs-extra',
        'glob',
        'chalk',
        'ora',
        'prompts',
        'simple-git',
      ],
      output: [{
        format: 'es',
        entryFileNames: '[name].js',
        banner: '#!/usr/bin/env node',
        exports: 'named',
        dir: resolve(cliOutput),
      }],
    },
  },
  plugins: [
    nodePolyfills(),
    copyPlugin(cliOutput),
  ],
});
