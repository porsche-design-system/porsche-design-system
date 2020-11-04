import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import pkg from '@porsche-design-system/js/package.json';

export default {
  input: 'projects/components-wrapper/src/bundle/index.js',
  output: {
    esModule: false,
    dir: 'dist/components-wrapper/bundle',
    format: 'umd',
    name: pkg.name,
    extend: true,
  },
  plugins: [
    resolve({
      resolveOnly: [/^@stencil\/.*$/],
    }),
    replace({
      // inject call of 'defineCustomElements()'
      'exports.PBanner': 'defineCustomElements();\n\n    exports.PBanner',
    }),
  ],
};
