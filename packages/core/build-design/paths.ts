import { resolve } from 'node:path';
import { pkgRoot } from '../paths';

/** 组件库代码根目录 */
export const designRoot = resolve(pkgRoot, 'components');

/** 组件库打包目录 */
export const designOutput = resolve(designRoot, 'dist');
