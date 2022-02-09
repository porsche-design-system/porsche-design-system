import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: ['react/jsx-runtime'],
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
];
