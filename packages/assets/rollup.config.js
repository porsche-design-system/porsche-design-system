import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const commonPlugins = () => [
  resolve({
    extensions: ['.ts'],
    resolveOnly: [/^@porsche-design-system\/.*$/]
  }),
  typescript()
];

export default [
  {
    input: 'src/index.ts',
    output: {
      esModule: false,
      dir: 'dist',
      format: 'umd',
      name: pkg.name,
      exports: 'named'
    },
    plugins: [
      ...commonPlugins(),
      typescript({ declaration: true, declarationDir: 'dist/types', rootDir: 'src/' }),
      process.env.NODE_ENV === 'production' && terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist/esm', format: 'esm', sourcemap: true },
      { dir: 'dist/cjs', format: 'cjs', exports: 'named', sourcemap: true }
    ],
    plugins: commonPlugins()
  }
];
