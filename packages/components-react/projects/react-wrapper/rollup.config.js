import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import resolve from '@rollup/plugin-node-resolve';
import bin from 'rollup-plugin-bin';
import preserveDirectives from 'rollup-plugin-preserve-directives';

const rootDir = '../..';
const projectDir = 'projects/react-wrapper';
const outputDir = 'dist/react-wrapper';
const input = `${projectDir}/src/public-api.ts`;

const typescriptOpts = {
  tsconfig: `${projectDir}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/jsdom-polyfill',
  '@porsche-design-system/components-js/partials',
  '@porsche-design-system/components-js/styles',
  '@porsche-design-system/components-js/testing',
  'react',
  'react/jsx-runtime',
];

const subPackageJsonConfig = {
  baseContents: {
    main: 'index.js',
    module: 'esm/index.js',
    types: 'index.d.ts',
    sideEffects: false,
  },
};

// to silence warnings like
// Module level directives cause errors when bundled, "use client" in "..." was ignored.
// https://github.com/Ephem/rollup-plugin-preserve-directives#disabling-warnings
const onwarn = (warning, warn) => {
  if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
    warn(warning);
  }
};

export default [
  {
    input,
    external,
    output: {
      dir: outputDir,
      format: 'cjs',
      preserveModules: true,
    },
    plugins: [
      preserveDirectives.default(),
      resolve(),
      typescript({
        ...typescriptOpts,
        declaration: true,
        declarationDir: outputDir,
        rootDir: 'src',
      }),
      copy({
        targets: [
          { src: `${rootDir}/LICENSE`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: `${projectDir}/README.md`, dest: outputDir },
          { src: `${projectDir}/package.json`, dest: outputDir },
          { src: '../components/CHANGELOG.md', dest: outputDir },
        ],
      }),
    ],
    onwarn,
  },
  {
    input,
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      preserveModules: true,
    },
    plugins: [preserveDirectives.default(), resolve(), typescript(typescriptOpts)],
    onwarn,
  },
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
    // typings are produced by main build
    input: `${projectDir}/src/testing/index.ts`,
    external,
    output: {
      file: `${outputDir}/testing/index.js`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    // typings are produced by main build
    input: `${projectDir}/src/partials/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/partials/index.js`,
        format: 'cjs',
        plugins: [generatePackageJson(subPackageJsonConfig)],
      },
      {
        file: `${outputDir}/partials/esm/index.js`,
        format: 'esm',
      },
    ],
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${projectDir}/src/styles/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/styles/index.js`,
        format: 'cjs',
        plugins: [generatePackageJson(subPackageJsonConfig)],
      },
      {
        file: `${outputDir}/styles/esm/index.js`,
        format: 'esm',
      },
    ],
    plugins: [
      typescript(typescriptOpts),
      copy({
        targets: [
          {
            src: `${projectDir}/src/styles/_index.scss`,
            dest: `${outputDir}/styles`,
          },
        ],
      }),
    ],
  },
  {
    input: `${projectDir}/bin/patchRemixRunProcessBrowserGlobalIdentifier.ts`,
    external: ['fs', 'path'],
    output: {
      file: `${outputDir}/bin/patchRemixRunProcessBrowserGlobalIdentifier.js`,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts), bin()],
  },
];
