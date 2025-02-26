import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { cliOutput, cliRoot } from './paths';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: { entry: { index: resolve(cliRoot, 'index.ts') } },
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
  ],
});
