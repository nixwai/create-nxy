import { series } from 'gulp';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { version } from './package.json';
import { toolOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, toolOutput),
);
