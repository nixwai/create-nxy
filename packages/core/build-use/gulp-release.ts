import { series } from 'gulp';
import { run } from '../tasks';
import { useRoot } from './paths';

export default series(
  () => run('bumpp --commit "chore(use): release v%s" --tag "v%s(use)"', useRoot),
);
