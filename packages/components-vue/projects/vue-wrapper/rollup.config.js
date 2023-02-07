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
  '@porsche-design-system/components-js/testing',
  '@porsche-design-system/components-js/styles',
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
        dir: `${outputDir}/${packagePath}`,
        format: 'cjs',
        plugins: [
          generatePackageJson({
            baseContents: {
              main: `index.js`,
              module: `esm/index.js`,
              types: `index.d.ts`,
              sideEffects: false,
            },
          }),
        ],
      },
      {
        dir: `${outputDir}/${packagePath}/esm`,
        format: 'esm',
      },
    ],
    plugins: [
      // TODO: only copy stuff once when needed instead of twice (= for each sub package)
      copy({
        targets: [
          {
            src: `${projectDir}/src/styles/scss.scss`,
            dest: `${outputDir}/styles`,
          },
        ],
      }),
      typescript(typescriptOpts),
    ],
  };
};

export default [
  ...['partials', 'styles'].map(buildConfig),
  {
    input: `${projectDir}/src/jsdom-polyfill/index.ts`,
    external,
    output: {
      file: `${outputDir}/jsdom-polyfill/index.js`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    // typings are generated via separate tsc command
    input: `${projectDir}/src/testing/index.ts`,
    external,
    output: {
      file: `${outputDir}/testing/index.js`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
];
