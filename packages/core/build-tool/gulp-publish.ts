import { series } from 'gulp';
import { REGISTRY } from '../config';
import { run } from '../tasks';
import { toolOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY}`, toolOutput),
);
