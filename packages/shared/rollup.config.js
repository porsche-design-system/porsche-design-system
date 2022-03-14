import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
    },
    plugins: [
      copy({
        targets: [{ src: 'src/css/*', dest: 'dist/css' }],
      }),
      typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }),
    ],
  },
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
    },
    plugins: [typescript()],
  },
  {
    input: 'src/testing.ts',
    external: Object.keys(pkg.dependencies),
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
