import { series } from 'gulp';
import { run } from '../tasks';
import { designRoot } from './paths';

export default series(
  () => run('bumpp --commit "chore(design): release v%s" --tag "v%s(design)"', designRoot),
);
