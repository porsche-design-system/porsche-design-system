import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      esModule: false,
      dir: 'dist',
      format: 'esm',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' })],
  },
  // {
  //   input: 'src/index.ts',
  //   output: { dir: 'dist/esm', format: 'esm' },
  //   plugins: [typescript()],
  // },
];
