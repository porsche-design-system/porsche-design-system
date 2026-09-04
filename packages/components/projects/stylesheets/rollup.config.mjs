// @ts-check
import typescript from '@rollup/plugin-typescript';

// The package's main (`.`) entry: the tree-shakeable CSS-variable name consts (generated from the
// meta into `src/generated/`) plus the hand-written `ref` helper — what runtime consumers like the
// components package import. With `preserveModules` the module graph is emitted under
// `dist/<esm|cjs>/` so `.` resolves to `dist/esm/index.mjs` / `dist/cjs/index.cjs`. The documented
// meta catalog lives in its own build (`rollup.config.meta.mjs` → `meta/`), and the generated CSS
// files live in `lib/` — keeping the three concerns in separate output dirs.
const input = ['src/index.ts'];
const outputDir = 'dist';

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
