import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist/index.js',

  external: ['@porsche-ui/ui-kit-js', '@porsche-ui/ui-kit-js/loader', 'react', 'react-dom', 'classnames'],

  plugins: [
    resolve()
  ],

  output: [
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ]
};
