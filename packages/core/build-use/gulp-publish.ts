import { series } from 'gulp';
import { run } from '../tasks';
import { useOutput } from './paths';

export default series(
  () => run('npm config set registry https://registry.npmjs.org'),
  () => run('pnpm publish', useOutput),
);
