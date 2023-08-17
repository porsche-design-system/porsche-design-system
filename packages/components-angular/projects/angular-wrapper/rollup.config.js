import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

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
          { src: `${rootDir}/LICENSE`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: `${rootDir}/packages/components/CHANGELOG.md`, dest: outputDir },
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
      file: `${outputDir}/jsdom-polyfill/index.cjs`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    // typings are generated via separate tsc command
    input: `${projectDir}/src/testing/index.ts`,
    external,
    output: {
      file: `${outputDir}/testing/index.cjs`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
];
