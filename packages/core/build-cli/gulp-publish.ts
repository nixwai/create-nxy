import { series } from 'gulp';
import { REGISTRY } from '../config';
import { run } from '../tasks';
import { cliOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY}`, cliOutput),
);
