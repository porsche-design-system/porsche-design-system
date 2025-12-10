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
    plugins: [typescript()],
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
          sideEffects: false,
          exports: {
            // Default export (JS)
            '.': {
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
          },
        },
      }),
    ],
  },
];
