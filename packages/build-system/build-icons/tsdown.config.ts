import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

const buildIconsRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildIconsRoot, '../../..');
const iconRoot = resolve(projRoot, 'packages/icons');
const iconOutput = resolve(iconRoot, 'dist');

const sharedConfig = {
  cwd: iconRoot,
  entry: { index: 'src/index.ts' },
  clean: false,
  platform: 'neutral' as const,
  deps: { neverBundle: ['vue'] },
  plugins: [
    Vue({ isProduction: true }),
  ],
  outputOptions: { exports: 'named' as const },
};

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    dts: false,
    outDir: iconOutput,
    outExtensions: () => ({ js: '.mjs' }),
  },
  {
    ...sharedConfig,
    format: 'cjs',
    dts: false,
    outDir: iconOutput,
    outExtensions: () => ({ js: '.js' }),
  },
  {
    ...sharedConfig,
    format: 'iife',
    dts: false,
    outDir: iconOutput,
    globalName: 'NxyIconsVue',
    outputOptions: {
      entryFileNames: 'index.iife.js',
      exports: 'named',
      globals: { vue: 'Vue' },
    },
  },
  {
    ...sharedConfig,
    entry: ['src/**/*.ts', '!src/**/*.test.ts'],
    format: 'esm',
    root: resolve(iconRoot, 'src'),
    sourcemap: false,
    outDir: resolve(iconOutput, 'types'),
    dts: {
      vue: true,
      emitDtsOnly: true,
      tsconfig: resolve(projRoot, 'tsconfig.json'),
    },
    plugins: [],
  },
]);
