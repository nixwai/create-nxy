import { series } from 'gulp';
import { version } from '../../presets/package.json';
import { REGISTRY } from '../config';
import { run, versionTag } from '../tasks';
import { presetOutput } from './paths';

export default series(
  () => run(`pnpm publish --registry ${REGISTRY} ${versionTag(version)}`, presetOutput),
);
