import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { dtsPlugin } from '../vite-configs';
import { iconOutput, iconRoot } from './paths';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: { entry: { index: resolve(iconRoot, 'src/index.ts') } },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.mjs',
          exports: 'named',
          dir: iconOutput,
        },
        {
          format: 'cjs',
          entryFileNames: 'index.js',
          exports: 'named',
          dir: iconOutput,
        },
        {
          format: 'iife',
          name: 'NxyIconsVue',
          entryFileNames: 'index.iife.js',
          globals: { vue: 'Vue' },
          exports: 'named',
          dir: iconOutput,
        },
      ],
    },
  },
  plugins: [
    vue(),
    dtsPlugin(resolve(iconRoot, 'src'), iconOutput),
  ],
});
