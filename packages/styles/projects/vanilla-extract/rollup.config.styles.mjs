import { rootBuild, stylesBuild } from './rollup.config.mjs';

export default [stylesBuild('cjs', 'cjs'), stylesBuild('esm', 'mjs'), rootBuild('cjs', 'cjs'), rootBuild('esm', 'mjs')];
