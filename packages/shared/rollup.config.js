import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import shebang from 'rollup-plugin-preserve-shebang';
import pkg from './package.json';

const input = 'src/index.ts';
const external = [
  ...Object.keys(pkg.dependencies),
  // JSS packages are hoisted from workspace root; keep them external at runtime
  'jss',
  'jss-preset-default',
  'jss-plugin-sort-css-media-queries',
  // change-case is ESM-only; must stay external to avoid CJS bundling issues
  'change-case',
  'fs',
  'path',
];

export default [
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      interop: 'auto', // needed for generateScss.ts of utilities package to work with default exports of jss dependencies
      plugins: [
        generatePackageJson({
          baseContents: (packageJson) => ({
            ...packageJson,
            name: '@porsche-design-system/shared',
            sideEffects: false,
            scripts: undefined,
            devDependencies: {},
            volta: undefined,
            exports: {
              '.': {
                import: {
                  types: './index.d.ts',
                  default: './esm/index.js',
                },
                require: {
                  types: './index.d.ts',
                  default: './index.js',
                },
              },
              // deep import so the metadata bundles of the styling packages can share the deprecation
              // contract and its wording at runtime without dragging this package's barrel along
              './deprecation': {
                import: {
                  types: './deprecation/index.d.ts',
                  default: './deprecation/esm/index.mjs',
                },
                require: {
                  types: './deprecation/index.d.ts',
                  default: './deprecation/cjs/index.cjs',
                },
              },
              './testing': {
                import: {
                  types: './testing/index.d.ts',
                  default: './testing/esm/index.mjs',
                },
                require: {
                  types: './testing/index.d.ts',
                  default: './testing/cjs/index.cjs',
                },
              },
              // deep import so that Vitest setups (and the bundled jsdom-polyfill) can normalize the `CSS`
              // namespace without dragging the Playwright configs and W3C validator of the barrel along
              './testing/normalize-css-namespace': {
                import: {
                  types: './testing/normalizeCssNamespace.d.ts',
                  default: './testing/normalize-css-namespace/esm/index.mjs',
                },
                require: {
                  types: './testing/normalizeCssNamespace.d.ts',
                  default: './testing/normalize-css-namespace/cjs/index.cjs',
                },
              },
              './css/styles.css': './css/styles.css',
              './css/styles': './css/styles.css',
              './tsconfig.json': './tsconfig.json',
              './examples': './examples/index.ts', // Examples is not bundled to avoid problems with next.js "use client" in mdx
              './examples/*': './examples/*.tsx', // deep imports let a page pull one example without dragging the whole barrel into its chunk
            },
          }),
        }),
      ],
    },
    plugins: [
      copy({
        targets: [
          { src: 'src/css/*', dest: 'dist/css' },
          { src: 'src/tsconfig.json', dest: 'dist' },
          { src: 'src/dummyassets/*', dest: 'dist/dummyassets' },
          { src: 'src/examples/*', dest: 'dist/examples' },
        ],
      }),
      typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
    },
    plugins: [typescript()],
  },
  {
    // is needed for deep import of shared/data
    input: 'src/data/index.ts',
    external,
    output: {
      dir: 'dist/esm/data',
      format: 'esm',
    },
    plugins: [typescript()],
  },
  {
    // additional cjs bundle is needed for jest unit tests
    input: 'src/data/index.ts',
    external,
    output: {
      dir: 'dist/data',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/deprecation/index.ts',
    external,
    output: [
      {
        file: 'dist/deprecation/esm/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/deprecation/cjs/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [typescript({ rootDir: 'src/deprecation' })],
  },
  {
    input: 'src/testing/index.ts',
    external,
    output: [
      {
        file: 'dist/testing/esm/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/testing/cjs/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [typescript({ rootDir: 'src/testing' })],
  },
  {
    // standalone bundle for the `./testing/normalize-css-namespace` deep import, see the exports map above
    input: 'src/testing/normalizeCssNamespace.ts',
    external,
    output: [
      {
        file: 'dist/testing/normalize-css-namespace/esm/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/testing/normalize-css-namespace/cjs/index.cjs',
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [typescript({ rootDir: 'src/testing' })],
  },
  {
    input: 'src/serve-dummyassets.ts',
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    // Suppress circular dependency warnings from third-party node_modules (e.g. union, spdy-transport).
    // These are well-known, harmless internal cycles in bundled dependencies and are not actionable.
    // Warnings from our own source files are still surfaced via the fallback to `warn(warning)`.
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids?.some((id) => id.includes('node_modules'))) return;
      warn(warning);
    },
    plugins: [shebang(), resolve({ preferBuiltins: true }), json(), commonjs(), typescript({ strict: false, rootDir: 'src' })],
  },
  {
    input: 'src/scripts/vrt/prepareVRTSnapshots.ts',
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    // Same as above: suppress node_modules circular dependency noise for this bin bundle.
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids?.some((id) => id.includes('node_modules'))) return;
      warn(warning);
    },
    plugins: [shebang(), resolve({ preferBuiltins: true }), json(), commonjs(), typescript({ strict: false, rootDir: 'src' })],
  },
];
