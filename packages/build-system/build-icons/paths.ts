import { resolve } from 'node:path';
import { pkgRoot } from '../build-paths';

/** 图标库根目录 */
export const iconRoot = resolve(pkgRoot, 'icons');

/** 图标库打包目录 */
export const iconOutput = resolve(iconRoot, 'dist');

/** svg 资源目录 */
export const pathSvg = resolve(iconRoot, 'svg');

/** src 目录 */
export const pathSrc = resolve(iconRoot, 'src');

/** 组件目录 */
export const pathComponents = resolve(pathSrc, 'components');
