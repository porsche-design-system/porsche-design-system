import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/lib/index.ts',
    output: {
      esModule: false,
      dir: 'dist/js',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist/js/types', rootDir: 'src/lib' })],
  },
  {
    input: 'src/lib/index.ts',
    output: { dir: 'dist/js/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
