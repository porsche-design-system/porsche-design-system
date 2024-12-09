import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/js/index.ts';
const inputVanillaExtract = 'src/vanilla-extract/index.ts';
const outputDir = 'dist';
const outputDirVanillaExtract = `${outputDir}/vanilla-extract`;

export default [
  // JSS Build - CJS
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
  // JSS Build - ESM
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src/js',
      }),
      copy({
        targets: [{ src: ['src/scss/**/*.scss', 'src/_index.scss'], dest: outputDir }],
        flatten: false,
      }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/index.cjs', // Default JSS export
          module: 'esm/index.mjs', // Default JSS export in ESM
          types: 'esm/index.d.ts', // Default types
          sideEffects: false,
          exports: {
            // Default export (JSS)
            '.': {
              require: './cjs/index.cjs',
              import: './esm/index.mjs',
              types: './esm/index.d.ts',
            },
            // Vanilla-Extract export
            './vanilla-extract': {
              require: './vanilla-extract/cjs/vanilla-extract/index.cjs',
              import: './vanilla-extract/esm/vanilla-extract/index.mjs',
              types: './vanilla-extract/esm/vanilla-extract/index.d.ts',
            },
          },
        },
      }),
    ],
  },
  // Vanilla-Extract Build - CJS
  {
    input: inputVanillaExtract,
    output: {
      dir: `${outputDirVanillaExtract}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [typescript()],
  },
  // Vanilla-Extract Build - ESM
  {
    input: inputVanillaExtract,
    output: {
      dir: `${outputDirVanillaExtract}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDirVanillaExtract}/esm`,
        exclude: '**.spec.ts',
      }),
    ],
  },
];
