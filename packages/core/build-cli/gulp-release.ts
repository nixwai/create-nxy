import { series } from 'gulp';
import { run } from '../tasks';

export default series(
  () => run('bumpp --commit "chore(cli): release v%s"'),
);
