import { series } from 'gulp';
import { run } from '../tasks';

export default series(
  () => run('bumpp --commit "chore(use): release v%s"'),
);
