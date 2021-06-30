import resolve from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';
import pkg from '@porsche-design-system/js/package.json';

const polyfills = [
  'construct-style-sheets-polyfill',
  'intersection-observer',
  'resize-observer-polyfill',
  'scroll-behavior-polyfill',
  'whatwg-fetch',
];

export default {
  input: 'projects/jsdom-polyfill/src/index.js',
  output: {
    esModule: false,
    dir: 'dist/components-wrapper/jsdom-polyfill',
    format: 'cjs',
    name: pkg.name,
    extend: true,
  },
  plugins: [
    polyfill(polyfills),
    resolve({
      resolveOnly: polyfills,
    }),
  ],
};
