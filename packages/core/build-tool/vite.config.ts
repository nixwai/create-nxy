import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { toolOutput, utilRoot } from '../paths';
import { copyPlugin, dtsPlugin } from '../vite-configs';

const entryIndex = resolve(__dirname, './index.ts');

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: { index: entryIndex },
      name: 'mortise-tenon-tool',
      fileName: 'mortise-tenon-tool',
    },
    rollupOptions: {
      external: ['lodash-es', 'date-fns'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: resolve(toolOutput, 'es'),
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: resolve(toolOutput, 'lib'),
        },
      ],
    },
  },
  resolve: { alias: { '@mortise-tenon/utils': utilRoot } },
  plugins: [
    dtsPlugin(utilRoot, toolOutput),
    copyPlugin(toolOutput),
  ],
});
