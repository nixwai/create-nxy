import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { dtsPlugin } from '../vite-configs';
import { useOutput, useRoot } from './paths';

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: { entry: { index: resolve(useRoot, 'index.ts') } },
    rollupOptions: {
      external: ['vue-demi', '@vueuse/core'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: resolve(useOutput, 'es'),
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: resolve(useOutput, 'lib'),
        },
      ],
    },
  },
  plugins: [
    dtsPlugin(useRoot, useOutput),
  ],
});
