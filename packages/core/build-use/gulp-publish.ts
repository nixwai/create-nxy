import { series } from 'gulp';
import { version } from '../../hooks/package.json';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { useOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, useOutput),
);
