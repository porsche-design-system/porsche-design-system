import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import shebang from 'rollup-plugin-preserve-shebang';
import pkg from './package.json';

const input = 'src/index.ts';
const external = [...Object.keys(pkg.dependencies), 'fs', 'path'];

export default [
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      interop: 'auto', // needed for generateScss.ts of utilities package to work with default exports of jss dependencies
      plugins: [
        generatePackageJson({
          baseContents: (packageJson) => ({
            ...packageJson,
            name: '@porsche-design-system/shared',
            sideEffects: false,
            scripts: undefined,
            devDependencies: {},
            volta: undefined,
          }),
        }),
      ],
    },
    plugins: [
      copy({
        targets: [
          { src: 'src/css/*', dest: 'dist/css' },
          { src: 'src/tsconfig.json', dest: 'dist' },
          { src: 'src/dummyassets/*', dest: 'dist/dummyassets' },
          { src: 'src/examples/*', dest: 'dist/examples' },
        ],
      }),
      typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
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
    },
    plugins: [typescript()],
  },
  {
    // additional cjs bundle is needed for jest unit tests
    input: 'src/data/index.ts',
    external,
    output: {
      dir: 'dist/data',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/playwright.a11y.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/playwright.e2e.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/playwright.vrt.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/serve-dummyassets.ts',
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    plugins: [shebang(), resolve(), json(), commonjs(), typescript({ strict: false, rootDir: 'src' })],
  },
];
