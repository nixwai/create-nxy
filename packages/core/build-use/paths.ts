import { resolve } from 'node:path';
import { buildOutput, pkgRoot } from '../paths';

/** 集成库代码根目录 */
export const useRoot = resolve(pkgRoot, 'hooks');

/** 集成库打包目录 */
export const useOutput = resolve(buildOutput, 'use');
