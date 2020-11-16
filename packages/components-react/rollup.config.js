import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import polyfill from 'rollup-plugin-polyfill';
import pkg from '@porsche-design-system/js/package.json';

export default {
  input: 'projects/components-wrapper/src/bundle/index.js',
  output: {
    esModule: false,
    dir: 'dist/components-wrapper/jsdom-polyfill',
    format: 'umd',
    name: pkg.name,
    extend: true,
  },
  plugins: [
    polyfill([
      '@porsche-design-system/construct-style-sheets-polyfill',
      'intersection-observer',
      'scroll-behavior-polyfill',
    ]),
    resolve({
      resolveOnly: [/^@stencil\/.*$/, /^@porsche-design-system\/.*$/],
    }),
    replace({
      // inject call of 'defineCustomElements()'
      'exports.PBanner': 'defineCustomElements();\n\n  exports.PBanner',
    }),
  ],
};
