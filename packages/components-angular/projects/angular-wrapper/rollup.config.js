import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const rootDir = '../..';
const projectDir = 'projects/angular-wrapper';
const outputDir = 'dist/angular-wrapper';

const typescriptOpts = {
  tsconfig: `${projectDir}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/jsdom-polyfill',
  '@porsche-design-system/components-js/partials',
  '@porsche-design-system/components-js/styles',
  '@porsche-design-system/components-js/ag-grid',
  '@porsche-design-system/components-js/styles/vanilla-extract',
  '@porsche-design-system/components-js/testing',
];

// identical with rollup.config.js from components-vue
// 1 input, 2 output formats
// typings are generated via separate tsc command since @rollup/plugin-typescript can't handle it properly
const buildConfig = (packagePath) => {
  return {
    input: `${projectDir}/src/${packagePath}/index.ts`,
    external,
    output: [
      {
        dir: `${outputDir}/${packagePath}/cjs`,
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
      {
        dir: `${outputDir}/${packagePath}/esm`,
        format: 'esm',
        entryFileNames: '[name].mjs',
      },
    ],
    plugins: [
      // TODO: only copy stuff once when needed instead of twice (= for each sub package)
      copy({
        targets: [
          {
            src: `${projectDir}/src/styles/_index.scss`,
            dest: `${outputDir}/styles`,
          },
          // TODO: stop copying unrelated files into the root of the package when bundling sub packages
          {
            src: [`${rootDir}/LICENSE.md`, `${rootDir}/OSS_NOTICE`, `${rootDir}/packages/components/CHANGELOG.md`],
            dest: outputDir,
          },
        ],
      }),
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/${packagePath}`,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
        },
      }),
    ],
  };
};

export default [
  buildConfig('styles'),
  {
    input: `${projectDir}/src/styles/vanilla-extract/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/styles/vanilla-extract/cjs/vanilla-extract/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/styles/vanilla-extract/esm/vanilla-extract/index.mjs`,
        format: 'esm',
      },
    ],
  },
  {
    input: `${projectDir}/src/partials/index.ts`,
    external,
    output: {
      file: `${outputDir}/partials/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      typescript(typescriptOpts),
      generatePackageJson({
        baseContents: {
          main: 'index.cjs',
          module: 'index.js', // support Webpack 4 by pointing `"module"` to a file with a `.js` extension
          types: 'index.d.ts',
          sideEffects: false,
        },
      }),
      copy({
        // support Webpack 4 by pointing `"module"` to a file with a `.js` extension
        targets: [{ src: `${outputDir}/partials/index.cjs`, dest: `${outputDir}/partials`, rename: () => 'index.js' }],
        hook: 'writeBundle',
      }),
    ],
  },
  {
    input: `${projectDir}/src/jsdom-polyfill/index.ts`,
    external,
    output: {
      file: `${outputDir}/jsdom-polyfill/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      typescript(typescriptOpts),
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
    // typings are generated via separate tsc command
    input: `${projectDir}/src/testing/index.ts`,
    external,
    output: {
      file: `${outputDir}/testing/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      typescript(typescriptOpts),
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
    input: `${projectDir}/src/ag-grid/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/ag-grid/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/ag-grid/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/ag-grid`,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
        },
      }),
    ],
  },
];
