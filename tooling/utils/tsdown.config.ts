import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const buildUtilsRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildUtilsRoot, '../..');
const toolRoot = resolve(projRoot, 'packages/utils');
const toolOutput = resolve(toolRoot, 'dist');

const sharedConfig = {
  cwd: toolRoot,
  entry: { index: 'src/index.ts' },
  unbundle: true,
  sourcemap: true,
  clean: false,
  platform: 'neutral' as const,
  deps: { neverBundle: [] }, // 根据实际使用情况来确定
  outputOptions: { exports: 'named' as const },
};

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    dts: false,
    outDir: resolve(toolOutput, 'es'),
    outExtensions: () => ({ js: '.mjs' }),
  },
  {
    ...sharedConfig,
    format: 'cjs',
    dts: false,
    outDir: resolve(toolOutput, 'lib'),
    outExtensions: () => ({ js: '.js' }),
  },
  {
    ...sharedConfig,
    entry: ['src/**/*.ts', '!src/**/*.test.ts'],
    format: 'esm',
    root: resolve(toolRoot, 'src'),
    sourcemap: false,
    outDir: resolve(toolOutput, 'types'),
    dts: {
      emitDtsOnly: true,
      tsconfig: resolve(projRoot, 'tsconfig.json'),
    },
  },
]);
