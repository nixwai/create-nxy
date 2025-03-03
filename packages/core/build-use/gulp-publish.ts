import { series } from 'gulp';
import { version } from '../../hooks/package.json';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { useRoot } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, useRoot),
);
