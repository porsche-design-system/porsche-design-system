import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import modify from 'rollup-plugin-modify';
import { version } from '../components-wrapper/package.json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const outputDir = '../../dist/components-wrapper';

export default [
  {
    input: 'src/index.js',
    output: {
      file: `${outputDir}/jsdom-polyfill/index.cjs`,
      format: 'cjs',
      exports: 'auto', // fixes rollup warning
    },
    plugins: [
      commonjs({ dynamicRequireTargets: ['src/**/*.js'] }),
      resolve(),
      // inject actual version so that componentsReady works
      modify({
        find: /'ROLLUP_REPLACE_VERSION'/,
        replace: `'${version}'`,
      }),
      // patch conditions into build to allow opt-out of CDN requests
      modify({
        // font-face css
        find: /appGlobals\.globalScripts\(\);/,
        replace: (match) => `if(!window.PDS_SKIP_FETCH) { ${match} }`,
      }),
      modify({
        // icon svgs (img src)
        find: /(src:) (buildIconUrl\()/,
        replace: (_, $1, $2) => `${$1} window.PDS_SKIP_FETCH ? undefined : ${$2}`,
      }),
      modify({
        // marque and crest assets
        find: /(const picture =)( [\s\S]*?;)/,
        replace: (_, $1, $2) => `${$1} window.PDS_SKIP_FETCH ? undefined : ${$2}`,
      }),
      copy({
        targets: [{ src: 'src/index.d.ts', dest: `${outputDir}/jsdom-polyfill` }],
      }),
    ],
  },
  {
    input: 'src/testing.ts',
    external: ['@testing-library/dom'],
    output: {
      file: `${outputDir}/testing/testing.cjs`,
      format: 'cjs',
    },
    plugins: [typescript({ declaration: true, declarationDir: `${outputDir}/testing`, rootDir: 'src' })],
  },
];
