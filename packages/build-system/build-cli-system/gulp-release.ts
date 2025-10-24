import { series } from 'gulp';
import { run } from '../tasks';
import { cliRoot } from './paths';

export default series(
  () => run('bumpp --commit "chore(cli): release v%s"', cliRoot),
);
