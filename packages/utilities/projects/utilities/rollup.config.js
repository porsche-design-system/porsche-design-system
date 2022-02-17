import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/jss/index.ts',
    output: {
      esModule: false,
      dir: 'dist/jss',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist/jss/types', rootDir: 'src/jss' })],
  },
  {
    input: 'src/jss/index.ts',
    output: { dir: 'dist/jss/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
