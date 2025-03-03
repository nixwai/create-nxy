import { series } from 'gulp';
import { version } from '../../cli/package.json';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { cliRoot } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, cliRoot),
);
