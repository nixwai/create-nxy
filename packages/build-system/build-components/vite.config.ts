import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { dtsPlugin } from '../vite-configs';
import { designOutput, designRoot } from './paths';
import { styleInjectPlugin } from './style-inject-plugin';

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    cssCodeSplit: true,
    lib: { entry: { index: resolve(designRoot, 'src/index.ts') } },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: resolve(designOutput, 'es'),
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: resolve(designOutput, 'lib'),
        },
      ],
    },
  },
  plugins: [
    vue(),
    styleInjectPlugin(),
    dtsPlugin(resolve(designRoot, 'src'), designOutput),
  ],
});
