import { createModulePaths, projRoot } from '../common/paths.ts';

export { projRoot };

export const [useRoot, useOutput] = createModulePaths('hooks');
