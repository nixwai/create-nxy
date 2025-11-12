import { series } from 'gulp';
import { run } from '../tasks';
import { iconRoot } from './paths';

export default series(
  () => run('bumpp --commit "chore(use): release v%s" --tag "v%s(use)"', iconRoot),
);
