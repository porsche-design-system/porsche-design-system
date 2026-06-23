// @ts-check
import typescript from '@rollup/plugin-typescript';

// Two entry points: the main `.` export (runtime constants + `ref`) and the `./meta` subpath (the
// documented meta catalog, leaf/CssNode types and `kindOf`). With `preserveModules`, each entry's
// module graph is emitted under `meta/<esm|cjs>/` so `./meta` resolves to `meta.mjs` / `meta.cjs`.
// This JS is internal-only; keeping it out of `dist/` leaves `dist/` as the pure, shippable CSS that
// the wrapper packages copy — mirroring the `scss`/`tailwindcss` packages' `dist/` vs `meta/` split.
const input = ['src/index.ts', 'src/meta.ts'];
const outputDir = 'meta';

export default [
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [typescript({ exclude: ['**/*.spec.ts'] })],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      typescript({ declaration: true, declarationDir: `${outputDir}/esm`, rootDir: 'src', exclude: ['**/*.spec.ts'] }),
    ],
  },
];
