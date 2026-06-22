// @ts-check
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

// Two entry points: the main `.` export (runtime constants + `ref`) and the `./meta` subpath (the
// documented meta catalog, leaf/CssNode types and `kindOf`). With `preserveModules`, each entry's
// module graph is emitted under `dist/<esm|cjs>/` so `./meta` resolves to `meta.mjs` / `meta.cjs`.
const input = ['src/index.ts', 'src/meta.ts'];
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
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          style: 'index.css',
          sideEffects: false,
          exports: {
            // Default export (JS)
            '.': {
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
            // Documented meta model (catalog, leaf/CssNode types, kindOf)
            './meta': {
              types: './esm/meta.d.ts',
              import: './esm/meta.mjs',
              default: './cjs/meta.cjs',
            },
            // Granular stylesheet access (e.g. ./index.css, ./variables.css, ./normalize.css)
            './*': './*',
          },
        },
      }),
    ],
  },
];
