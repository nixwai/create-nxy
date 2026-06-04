import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const buildHooksRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildHooksRoot, '../..');
const useRoot = resolve(projRoot, 'packages/hooks');
const useOutput = resolve(useRoot, 'dist');

const sharedConfig = {
  cwd: useRoot,
  entry: { index: 'src/index.ts' },
  unbundle: true,
  sourcemap: true,
  clean: false,
  platform: 'neutral' as const,
  deps: { neverBundle: ['vue-demi'] },
  outputOptions: { exports: 'named' as const },
};

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    dts: false,
    outDir: resolve(useOutput, 'es'),
    outExtensions: () => ({ js: '.mjs' }),
  },
  {
    ...sharedConfig,
    format: 'cjs',
    dts: false,
    outDir: resolve(useOutput, 'lib'),
    outExtensions: () => ({ js: '.js' }),
  },
  {
    ...sharedConfig,
    entry: ['src/**/*.ts', '!src/**/*.test.ts'],
    format: 'esm',
    root: resolve(useRoot, 'src'),
    sourcemap: false,
    outDir: resolve(useOutput, 'types'),
    dts: {
      emitDtsOnly: true,
      tsconfig: resolve(projRoot, 'tsconfig.json'),
    },
  },
]);
