import { resolve } from 'node:path';
import { pkgRoot } from '../build-paths';

/** 集成库代码根目录 */
export const useRoot = resolve(pkgRoot, 'hooks');

/** 集成库打包目录 */
export const useOutput = resolve(useRoot, 'dist');
