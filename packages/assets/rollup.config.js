import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-preserve-shebang';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const rootDir = '../..';
const outputDir = 'dist';
const input = 'src/index.ts';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/],
  }),
];

export default [
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [...commonPlugins, typescript()],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      ...commonPlugins,
      typescript({ declaration: true, declarationDir: `${outputDir}/esm`, rootDir: 'src' }),
      copy({
        targets: [
          { src: `${rootDir}/LICENSE.md`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: 'README.md', dest: outputDir },
          { src: 'CHANGELOG.md', dest: outputDir },
        ],
      }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: (pkg) => {
          ['dependencies', 'devDependencies', 'volta', 'scripts', 'files', 'bin'].forEach((key) => delete pkg[key]);
          return {
            ...pkg,
            main: 'cjs/src/index.cjs',
            module: 'esm/src/index.mjs',
            types: 'esm/index.d.ts',
          };
        },
      }),
    ],
  },
  {
    input: 'src/serve-cdn.ts',
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    plugins: [shebang(), resolve(), json(), commonjs(), typescript({ strict: false, rootDir: 'src' })],
  },
];
