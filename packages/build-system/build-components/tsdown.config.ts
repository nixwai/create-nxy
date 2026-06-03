import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';
import { styleInjectPlugin } from './style-inject-plugin.ts';

const buildComponentsRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildComponentsRoot, '../../..');
const designRoot = resolve(projRoot, 'packages/components');
const designOutput = resolve(designRoot, 'dist');

const sharedConfig = {
  cwd: designRoot,
  entry: { index: 'src/index.ts' },
  root: '.',
  unbundle: true,
  sourcemap: true,
  clean: false,
  platform: 'neutral' as const,
  deps: { neverBundle: ['vue', '@vueuse/core'] },
  plugins: [
    Vue({ isProduction: true }),
    styleInjectPlugin(),
  ],
  outputOptions: {
    exports: 'named' as const,
    preserveModulesRoot: designRoot,
  },
};

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    dts: false,
    outDir: resolve(designOutput, 'es'),
    outExtensions: () => ({ js: '.mjs' }),
    css: {
      splitting: true,
      inject: true,
    },
  },
  {
    ...sharedConfig,
    format: 'cjs',
    dts: false,
    outDir: resolve(designOutput, 'lib'),
    outExtensions: () => ({ js: '.js' }),
    css: {
      splitting: true,
      inject: true,
    },
  },
  {
    ...sharedConfig,
    format: 'esm',
    outDir: resolve(designOutput, 'types'),
    dts: {
      vue: true,
      emitDtsOnly: true,
      tsconfig: resolve(projRoot, 'tsconfig.json'),
    },
    plugins: [
      Vue({ isProduction: true }),
    ],
  },
]);
