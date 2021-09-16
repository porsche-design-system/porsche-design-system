import resolve from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';
import pkg from '@porsche-design-system/js/package.json';
import multi from '@rollup/plugin-multi-entry';

const polyfills = [
  '@juggle/resize-observer',
  'construct-style-sheets-polyfill',
  'intersection-observer',
  'scroll-behavior-polyfill',
  'whatwg-fetch',
];

export default {
  input: ['projects/jsdom-polyfill/src/**/*.js'],
  output: {
    esModule: false,
    file: 'dist/components-wrapper/jsdom-polyfill/index.js',
    format: 'cjs',
    name: pkg.name,
    extend: true,
  },
  plugins: [polyfill(polyfills), multi({ exports: false }), resolve()],
};
