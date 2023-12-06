import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json';

const input = 'src/index.ts';
const external = [...Object.keys(pkg.dependencies), 'fs', 'path'];

export default [
  {
    input,
    external,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      copy({
        targets: [
          { src: 'src/css/*', dest: 'dist/css' },
          { src: 'src/tsconfig.json', dest: 'dist' },
        ],
      }),
      generatePackageJson({
        outputFolder: 'dist',
        baseContents: (packageJson) => ({
          ...packageJson,
          name: '@porsche-design-system/shared',
          sideEffects: false,
          scripts: undefined,
          devDependencies: {},
          volta: undefined,
          // TODO: output dependencies are wrong and only contain 3 jss packages
        }),
      }),
      typescript({ declaration: true, declarationDir: 'dist/esm', rootDir: 'src' }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      interop: 'auto', // needed for generateScss.ts of utilities package to work with default exports of jss dependencies
    },
    plugins: [typescript()],
  },
  {
    // is needed for deep import of shared/data
    input: 'src/data/index.ts',
    external,
    output: {
      dir: 'dist/esm/data',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [typescript()],
  },
  {
    // additional cjs bundle is needed for jest unit tests
    input: 'src/data/index.ts',
    external,
    output: {
      dir: 'dist/cjs/data',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing.ts',
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/jest.config.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/jest-puppeteer.config.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
];
