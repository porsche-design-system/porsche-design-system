import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json';

const input = 'src/index.ts';
const external = Object.keys(pkg.dependencies);

export default [
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      plugins: [
        generatePackageJson({
          baseContents: (packageJson) => ({
            ...packageJson,
            name: '@porsche-design-system/shared',
            main: 'index.js',
            module: 'esm/index.js',
            types: 'types/index.d.ts',
            sideEffects: false,
            scripts: {},
            devDependencies: {},
          }),
        }),
      ],
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
    external,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
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
