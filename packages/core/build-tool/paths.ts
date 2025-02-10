import { resolve } from 'node:path';
import { buildOutput, pkgRoot } from '../paths';

/** 工具库代码根目录 */
export const toolRoot = resolve(pkgRoot, 'utils');

/** 工具库打包目录 */
export const toolOutput = resolve(buildOutput, 'tool');
