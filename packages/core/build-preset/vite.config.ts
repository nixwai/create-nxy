import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { copyPlugin, dtsPlugin } from '../vite-configs';
import { presetOutput, presetRoot } from './paths';

const entryIndex = resolve(__dirname, './index.ts');
const entryHelper = resolve(__dirname, './helper.ts');

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: { index: entryIndex, helper: entryHelper },
      name: 'mortise-tenon-preset',
      fileName: 'mortise-tenon-preset',
    },
    rollupOptions: {
      external: ['unocss', '@unocss/preset-mini'],
      output: [{
        format: 'es',
        entryFileNames: '[name].js',
        exports: 'named',
        dir: resolve(presetOutput, 'dist'),
      }],
    },
  },
  plugins: [
    dtsPlugin(presetRoot, presetOutput),
    copyPlugin(presetOutput),
  ],
});
