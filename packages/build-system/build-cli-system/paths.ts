import { resolve } from 'node:path';
import { pkgRoot } from '../build-paths';

/** 代码根目录 */
export const cliRoot = resolve(pkgRoot, 'cli');

/** 打包目录 */
export const cliOutput = resolve(cliRoot, 'dist');
