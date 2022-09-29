import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import modify from 'rollup-plugin-modify';

export default {
  input: 'projects/jsdom-polyfill/src/index.js',
  output: {
    file: 'dist/components-wrapper/jsdom-polyfill/index.js',
    format: 'cjs',
    exports: 'auto', // fixes rollup warning
  },
  plugins: [
    commonjs({ dynamicRequireTargets: ['projects/jsdom-polyfill/src/**/*.js'] }),
    resolve(),
    modify({
      find: /console.warn\(`The Porsche Design System had to inject our font-face\.css file into your head\.[\s\S]*?`\);/,
      replace: '',
    }),
    // patch conditions into build to allow opt out of CDN requests
    modify({
      // font-face css
      find: /appGlobals\.globalScripts\(\);/,
      replace: (match) => `if(!window.PDS_SKIP_FETCH) { ${match} }`,
    }),
    modify({
      // icon svgs
      find: /(const pdsFetch = \(input, init\) =>) (fetch\(input, init\);)/,
      replace: (_, $1, $2) => `${$1} window.PDS_SKIP_FETCH ? Promise.resolve({ ok:true, text: () => ''}) : ${$2}`,
    }),
    modify({
      // marque assets
      find: /(const picture =)( [\s\S]*?;)/,
      replace: (_, $1, $2) => `${$1} window.PDS_SKIP_FETCH ? undefined : ${$2}`,
    }),
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
