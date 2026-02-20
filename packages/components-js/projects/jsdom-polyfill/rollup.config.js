import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import modify from 'rollup-plugin-modify';
import { version } from '../components-wrapper/package.json';

const outputDir = '../../dist/components-wrapper';

export default [
  {
    input: 'src/index.js',
    output: {
      file: `${outputDir}/jsdom-polyfill/index.cjs`,
      format: 'cjs',
      exports: 'auto', // fixes rollup warning
      inlineDynamicImports: true,
    },
    plugins: [
      dynamicImportVars({
        include: ['src/**/*.js'],
      }),
      commonjs({ dynamicRequireTargets: ['src/**/*.js'] }),
      resolve(),
      /* Fixes flaky problem with https://github.com/GoogleChromeLabs/intersection-observer polyfill where window is not defined:
       * ReferenceError: window is not defined
       */
      modify({
        find: /(return window\.performance && performance\.now && performance\.now\(\);)/,
        replace: (_, $1) => `if (typeof window !== 'undefined') {${$1}}`,
      }),
      /* Fixes problem with https://github.com/calebdwilliams/construct-style-sheets polyfill where document definition is not safely checked causing lots of:
       * Error: Uncaught [ReferenceError: document is not defined] errors
       */
      modify({
        find: /if \(!document\)/,
        replace: () => `if (typeof document === 'undefined' || !document)`,
      }),
      modify({
        find: /(:not\(:defined,\[data-ssr]\)['"`]:\s*{)[^}]*(})/,
        replace: (_, $1, $2) => `${$1}${$2}`,
      }),
      /* TODO: There should be a better solution for this
       * This is necessary since stencil made the appGlobals function async.
       * Following error is produced without the replacement: (plugin commonjs--resolver) RollupError: Expression expected
       * Other solutions to switch to vite or to use the ESM build directly didn't work eiter due to problems with the dynamic imports
       */
      modify({
        find: /await (appGlobals)/,
        replace: (_, $1) => `${$1}`,
      }),
      // inject actual version so that componentsReady works
      modify({
        find: /'ROLLUP_REPLACE_VERSION'/,
        replace: `'${version}'`,
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
      generatePackageJson({
        baseContents: {
          main: 'index.cjs',
          types: 'index.d.ts',
          sideEffects: false,
        },
      }),
    ],
  },
  {
    input: 'src/testing.ts',
    external: ['@testing-library/dom'],
    output: {
      file: `${outputDir}/testing/index.cjs`,
      format: 'cjs',
    },
    // emitted declarations are named `testing.d.ts` because of input file
    // this is renamed to `index.d.ts` via npm script for consistency
    plugins: [
      typescript({ declaration: true, declarationDir: `${outputDir}/testing`, rootDir: 'src' }),
      generatePackageJson({
        baseContents: {
          main: 'index.cjs',
          types: 'index.d.ts',
          sideEffects: false,
        },
      }),
    ],
  },
];
