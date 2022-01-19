import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/],
  }),
];

export default [
  {
    input: 'src/jss/public-api.ts',
    output: {
      esModule: false,
      dir: 'dist/jss',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [
      ...commonPlugins,
      typescript({ declaration: true, declarationDir: 'dist/jss/types', rootDir: 'src/jss' }),
    ],
  },
  {
    input: 'src/jss/public-api.ts',
    output: { dir: 'dist/jss/esm', format: 'esm' },
    plugins: [...commonPlugins, typescript()],
  },
];
