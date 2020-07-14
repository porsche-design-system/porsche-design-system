import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import pkg from './package.json';

const commonPlugins = () => [
  resolve({
    extensions: ['.ts', '.js'],
    resolveOnly: [/^@porsche-design-system\/.*$/]
  }),
  typescript({ useTsconfigDeclarationDir: true })
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
      typescript({
        typescript: ttypescript,
        tsconfigDefaults: {
          compilerOptions: {
            plugins: [
              { transform: 'typescript-transform-paths' },
              { transform: 'typescript-transform-paths', afterDeclarations: true }
            ]
          }
        },
        useTsconfigDeclarationDir: true
      }),
      process.env.NODE_ENV === 'production' && terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist/esm', format: 'esm' },
      { dir: 'dist/cjs', format: 'cjs', exports: 'named' }
    ],
    plugins: commonPlugins()
  }
];
