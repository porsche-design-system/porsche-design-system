import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper';

const typescriptOpts = {
  tsconfig: `${projectDir}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/jsdom-polyfill',
  '@porsche-design-system/components-js/partials',
  '@porsche-design-system/components-js/styles',
  '@porsche-design-system/components-js/testing',
];

// identical with rollup.config.js from components-angular
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
      // typings are generated via separate tsc command
      typescript(typescriptOpts),
      // TODO: only copy stuff once when needed instead of twice (= for each sub package)
      copy({
        targets: [
          {
            src: `${projectDir}/src/styles/_index.scss`,
            dest: `${outputDir}/styles`,
          },
        ],
      }),
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
    input: `${projectDir}/src/partials/index.ts`,
    external,
    output: {
      file: `${outputDir}/partials/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      // typings are generated via separate tsc command
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
      // typings are generated via separate tsc command
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
    input: `${projectDir}/src/testing/index.ts`,
    external,
    output: {
      file: `${outputDir}/testing/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      // typings are generated via separate tsc command
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
];
