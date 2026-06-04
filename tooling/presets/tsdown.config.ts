import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const buildPresetsRoot = dirname(fileURLToPath(import.meta.url));
const projRoot = resolve(buildPresetsRoot, '../..');
const presetRoot = resolve(projRoot, 'packages/presets');
const presetOutput = resolve(presetRoot, 'dist');

const sharedConfig = {
  cwd: presetRoot,
  entry: {
    index: 'src/index.ts',
    // helper: 'src/helper.ts', // 有需要时可以添加
  },
  clean: false,
  platform: 'neutral' as const,
  deps: { neverBundle: ['unocss', /@unocss\/.*/] },
  outputOptions: { exports: 'named' as const },
};

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    dts: false,
    outDir: presetOutput,
    outExtensions: () => ({ js: '.js' }),
  },
  {
    ...sharedConfig,
    entry: ['src/**/*.ts', '!src/**/*.test.ts'],
    format: 'esm',
    root: resolve(presetRoot, 'src'),
    sourcemap: false,
    outDir: resolve(presetOutput, 'types'),
    dts: {
      emitDtsOnly: true,
      tsconfig: resolve(projRoot, 'tsconfig.json'),
    },
  },
]);
