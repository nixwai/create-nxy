import { series } from 'gulp';
import { version } from '../../icons/package.json';
import { REGISTRY } from '../build-config';
import { run, versionTag } from '../tasks';
import { iconRoot } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, iconRoot),
);
