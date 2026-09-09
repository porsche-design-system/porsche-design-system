// @ts-check
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/index.ts';
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
    plugins: [typescript({ noEmitOnError: true, exclude: ['projects/**/*', '**/*.spec.ts'] })],
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
        exclude: ['projects/**/*', '**/*.spec.ts'],
      }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
          // Note: no `exports` field here on purpose. This package.json is copied into the
          // wrapper packages (components-js/react/vue) as a nested folder, where the parent's
          // root `exports` map governs resolution. A nested `exports` field would be ignored
          // and triggers publint's NESTED_PACKAGE_JSON_FIELD_IGNORED warning.
        },
      }),
    ],
  },
];
