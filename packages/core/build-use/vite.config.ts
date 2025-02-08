import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { hookRoot, useOutput } from '../paths';
import { copyPlugin, dtsPlugin } from '../vite-configs';

const entryIndex = resolve(__dirname, './index.ts');

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: { index: entryIndex },
      name: 'mortise-tenon-use',
      fileName: 'mortise-tenon-use',
    },
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
  resolve: { alias: { '@mortise-tenon/hooks': hookRoot } },
  plugins: [
    dtsPlugin(hookRoot, useOutput),
    copyPlugin(useOutput),
  ],
});
