// @ts-check
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

/**
 * Shared rollup config for the private workspace libraries that previously used
 * `tsup <entry> --format esm,cjs --dts` (the `packages/assets/projects/*` libs and the
 * storefront stackblitz helper).
 *
 * It reproduces the exact same four outputs — `<name>.js` (CJS), `<name>.mjs` (ESM),
 * `<name>.d.ts` and `<name>.d.mts` (identical bundled declarations) — using the bundler
 * already used everywhere else in the monorepo, plus `rollup-plugin-dts` for the bundled
 * declaration (which is what `tsup --dts` uses internally). This removes the `tsup`
 * dependency (and its vulnerable transitive `esbuild`) without changing each package's
 * published interface.
 *
 * @param {{
 *   input?: string;
 *   outputName?: string;
 *   outputDir?: string;
 *   tsconfig?: string;
 *   external?: (string | RegExp)[];
 * }} [options]
 * @returns {import('rollup').RollupOptions[]}
 */
export const createAssetLibRollupConfig = ({
  input = 'index.ts',
  outputName = 'index',
  outputDir = 'dist',
  tsconfig = './tsconfig.json',
  external = [],
} = {}) => [
  {
    input,
    external,
    output: {
      file: `${outputDir}/${outputName}.js`,
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript({ noEmitOnError: true, tsconfig, exclude: ['**/*.spec.ts'] })],
  },
  {
    input,
    external,
    output: {
      file: `${outputDir}/${outputName}.mjs`,
      format: 'esm',
    },
    plugins: [typescript({ noEmitOnError: true, tsconfig, exclude: ['**/*.spec.ts'] })],
  },
  {
    input,
    external,
    // Emit the bundled declaration to both `.d.ts` and `.d.mts` so the `require` and
    // `import` conditions of the package `exports` map resolve to identical types.
    output: [
      { file: `${outputDir}/${outputName}.d.ts`, format: 'es' },
      { file: `${outputDir}/${outputName}.d.mts`, format: 'es' },
    ],
    plugins: [dts({ tsconfig })],
  },
];
