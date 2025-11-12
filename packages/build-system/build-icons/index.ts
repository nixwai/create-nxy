import { series } from 'gulp';
import { version } from '../../icons/package.json';
import { delPath, publishTask, releaseTask, run } from '../tasks';
import { generateIconComp } from './generate';
import { iconOutput, iconRoot } from './paths';

export const generate = series(
  () => generateIconComp(),
);

export const release = series(
  () => releaseTask('icon', iconRoot),
);

export const build = series(
  () => generateIconComp(),
  () => delPath(iconOutput),
  () => run('vite build'),
);

export const publish = series(
  () => publishTask(version, iconRoot),
);
