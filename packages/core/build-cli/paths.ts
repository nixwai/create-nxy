import { resolve } from 'node:path';
import { buildOutput, pkgRoot } from '../paths';

/** 组件库代码根目录 */
export const cliRoot = resolve(pkgRoot, 'cli');

/** 组件库打包目录 */
export const cliOutput = resolve(buildOutput, 'cli');
