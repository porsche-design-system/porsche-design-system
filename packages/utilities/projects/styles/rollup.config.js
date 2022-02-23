import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/js',
      format: 'cjs',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist/js/types', rootDir: 'src' })],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'dist/js/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
