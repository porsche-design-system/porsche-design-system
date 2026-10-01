// @ts-check
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

/**
 * Bundles the package export – `generated/examples.ts`, written by `scripts/build.ts` – into `dist/`, with the same
 * plugins as `createAssetLibRollupConfig()` of the other private workspace libraries. ESM only, because the package is
 * `"type": "module"`: the CommonJS `.js` of the shared config would be read as ESM here.
 *
 * The declarations are bundled too, so `dist/examples.d.ts` carries the types of `lib/meta.ts` it re-exports and a
 * consumer compiles nothing of this package.
 */

const input = 'generated/examples.ts';
const tsconfig = './tsconfig.export.json';

export default [
  {
    input,
    output: { file: 'dist/examples.js', format: 'esm' },
    plugins: [typescript({ noEmitOnError: true, tsconfig })],
  },
  {
    input,
    output: { file: 'dist/examples.d.ts', format: 'es' },
    plugins: [dts({ tsconfig })],
  },
];
