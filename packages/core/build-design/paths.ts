import { resolve } from 'node:path';
import { buildOutput, pkgRoot } from '../paths';

/** 组件库代码根目录 */
export const designRoot = resolve(pkgRoot, 'components');

/** 组件库打包目录 */
export const designOutput = resolve(buildOutput, 'design');
