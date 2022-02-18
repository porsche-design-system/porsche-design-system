import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = 'src/index.ts';
const external = ['react/jsx-runtime'];

export default [
  {
    input,
    external,
    output: {
      esModule: false,
      dir: 'dist',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
      globals: {
        'react/jsx-runtime': 'jsxRuntime',
      },
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' })],
  },
  {
    input,
    external,
    output: { dir: 'dist/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
