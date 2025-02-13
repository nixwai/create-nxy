import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { copyPlugin, dtsPlugin } from '../vite-configs';
import { hookRoot, useOutput } from './paths';

const entryIndex = resolve(__dirname, './index.ts');

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: { entry: { index: entryIndex } },
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
    dtsPlugin(hookRoot, useOutput),
    copyPlugin(useOutput),
  ],
});
