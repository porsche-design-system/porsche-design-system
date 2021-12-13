import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      esModule: false,
      dir: 'dist',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [
      copy({
        targets: [{ src: 'src/css/*', dest: 'dist/css' }],
      }),
      typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'dist/esm', format: 'esm' },
    plugins: [typescript()],
  },
  {
    input: 'src/testing.ts',
    external: Object.keys(pkg.dependencies),
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/jest.config.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/jest-angular.config.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing/jest-puppeteer.config.ts',
    output: {
      dir: 'dist/testing',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript()],
  },
];
