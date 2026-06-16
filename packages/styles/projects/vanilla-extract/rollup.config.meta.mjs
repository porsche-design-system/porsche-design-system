import { metaBuild } from './rollup.config.mjs';

export default [metaBuild('cjs', 'cjs'), metaBuild('esm', 'mjs')];
