import { series } from 'gulp';
import { delPath, run } from '../tasks';
import { generateIconComp } from './gulp-generate';
import { iconOutput } from './paths';

export default series(
  () => delPath(iconOutput),
  () => generateIconComp(),
  () => run('vite build'),
);
