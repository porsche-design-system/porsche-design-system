import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const CODES = ['THIS_IS_UNDEFINED', 'MISSING_GLOBAL_NAME', 'CIRCULAR_DEPENDENCY'];

const discardWarning = (warning) => {
  if (CODES.includes(warning.code)) {
    return;
  }

  console.error(warning);
};

const env = process.env.NODE_ENV;

const commonPlugins = () => [
  external({
    includeDependencies: true
  }),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-typescript'],
    extensions: EXTENSIONS,
    exclude: 'node_modules/**',
    babelHelpers: 'bundled' // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
  }),
  commonjs({
    include: /node_modules/
  }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  resolve({
    extensions: EXTENSIONS,
    preferBuiltins: false
  })
];

export default [
  {
    onwarn: discardWarning,
    input: 'dist/tsc/index.js',
    output: {
      esModule: false,
      file: pkg.unpkg,
      format: 'umd',
      name: pkg.name,
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    plugins: [...commonPlugins(), env === 'production' && terser()]
  },
  {
    onwarn: discardWarning,
    input: 'dist/tsc/index.js',
    output: [
      { dir: 'dist/esm', format: 'esm', sourcemap: true },
      { dir: 'dist/cjs', format: 'cjs', exports: 'named', sourcemap: true }
    ],
    plugins: commonPlugins()
  }
];
