import resolve from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';
import pkg from '@porsche-design-system/js/package.json';
import commonjs from '@rollup/plugin-commonjs';

const polyfills = [
  '@juggle/resize-observer',
  'construct-style-sheets-polyfill',
  'intersection-observer',
  'scroll-behavior-polyfill',
  'whatwg-fetch',
];

export default {
  input: 'projects/jsdom-polyfill/src/index.js',
  output: {
    esModule: false,
    file: 'dist/components-wrapper/jsdom-polyfill/index.js',
    format: 'umd',
    name: pkg.name,
    extend: true,
  },
  plugins: [
    commonjs({ dynamicRequireTargets: ['projects/jsdom-polyfill/src/**/*.js'] }),
    polyfill(polyfills),
    resolve(),
  ],
};
