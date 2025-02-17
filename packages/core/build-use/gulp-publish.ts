import { series } from 'gulp';
import { REGISTRY } from '../config';
import { run } from '../tasks';
import { useOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY}`, useOutput),
);
