import { resolve } from 'node:path';

/** 项目根路径 */
export const projRoot = resolve(__dirname, '../../');
/** pkg根目录 */
export const pkgRoot = resolve(projRoot, 'packages');
/** 组件库根目录 */
export const compRoot = resolve(pkgRoot, 'components');
/** hook根目录 */
export const hookRoot = resolve(pkgRoot, 'hooks');
/** 工具库目录 */
export const utilRoot = resolve(pkgRoot, 'utils');
/** 预设库目录 */
export const presetRoot = resolve(pkgRoot, 'presets');

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist');
/** `/dist/mortise-tenon-design` */
export const designOutput = resolve(buildOutput, 'mortise-tenon-design');
/** `/dist/mortise-tenon-use` */
export const useOutput = resolve(buildOutput, 'mortise-tenon-use');
/** `/dist/mortise-tenon-tool` */
export const toolOutput = resolve(buildOutput, 'mortise-tenon-tool');
/** `/dist/mortise-tenon-preset` */
export const presetOutput = resolve(buildOutput, 'mortise-tenon-preset');
