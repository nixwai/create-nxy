import { series } from 'gulp';
import { version } from '../../utils/package.json';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { toolOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, toolOutput),
);
