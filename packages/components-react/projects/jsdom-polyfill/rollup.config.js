import resolve from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';
import pkg from '@porsche-design-system/js/package.json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import modify from 'rollup-plugin-modify';

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
    modify({
      find: /console.warn(`The Porsche Design System had to inject our font-face.css file into your head.(.|s)*?);/,
      replace: '',
    }),
    modify({
      find: /(appGlobals\.globalScripts\(\);)/,
      replace: (match) => `if(!window.PDS_SKIP_FETCH) { ${match} }`,
    }),
    modify({
      find: /(const pdsFetch = \(input, init\) =>) (fetch\(input, init\);)/,
      replace: (match, capGrp1, capGrp2) => `${capGrp1} window.PDS_SKIP_FETCH ? undefined : ${capGrp2}`,
    }),
    modify({
      find: /(const picture =)( \(resizeObserver(?:.|\s)*?;)/,
      replace: (match, capGrp1, capGrp2) => `${capGrp1} window.PDS_SKIP_FETCH ? undefined : ${capGrp2}`,
    }),
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
