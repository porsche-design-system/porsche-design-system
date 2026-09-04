// @ts-check
import typescript from '@rollup/plugin-typescript';

// The `./meta` subpath: the documented meta catalog (`stylesheetsMeta`, leaf/CssNode types and
// `kindOf`). With `preserveModules`, its module graph is emitted under `meta/<esm|cjs>/` so `./meta`
// resolves to `meta.mjs` / `meta.cjs`. This JS is internal-only and consumed by the storefront docs;
// the runtime `.` entry has its own build (`rollup.config.mjs` → `dist/`) and the generated CSS
// files live in `lib/` — mirroring the `scss`/`tailwindcss` packages' `dist/` vs `meta/` split.
const input = ['src/meta.ts'];
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
    plugins: [typescript({ noEmitOnError: true, exclude: ['**/*.spec.ts', 'tests/**'] })],
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
      typescript({
        noEmitOnError: true,
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        rootDir: 'src',
        exclude: ['**/*.spec.ts', 'tests/**'],
      }),
    ],
  },
];
