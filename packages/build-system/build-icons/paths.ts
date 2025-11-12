import { resolve } from 'node:path';
import { createModulePaths } from '../build-paths';

export const [iconRoot, iconOutput] = createModulePaths('icons');

/** svg 资源目录 */
export const pathSvg = resolve(iconRoot, 'svg');

/** src 目录 */
export const pathSrc = resolve(iconRoot, 'src');

/** 组件目录 */
export const pathComponents = resolve(pathSrc, 'components');
