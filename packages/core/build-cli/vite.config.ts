import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { copyPlugin } from '../vite-configs';
import { cliOutput } from './paths';

const entryIndex = resolve(__dirname, './index.ts');

export default defineConfig({
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  build: {
    emptyOutDir: false,
    lib: { entry: { index: entryIndex } },
    rollupOptions: {
      external: ['command-line-args', 'command-line-usage', 'ora', 'prompts', 'simple-git'],
      output: [{
        format: 'es',
        entryFileNames: '[name].js',
        exports: 'named',
        dir: resolve(cliOutput),
      }],
    },
  },
  plugins: [
    copyPlugin(cliOutput),
  ],
});
