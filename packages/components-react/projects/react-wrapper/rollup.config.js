import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
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

const sharedPlugins = [
  replace({
    preventAssignment: true,
    'process.browser': true, // normal react project doesn't have process defined or process.browser replaced, so we need to remove it
  }),
  preserveDirectives.default(),
  resolve(),
];

export default [
  {
    input,
    external,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [...sharedPlugins, typescript(typescriptOpts)],
    onwarn,
  },
  {
    input,
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      ...sharedPlugins,
      typescript({ ...typescriptOpts, declaration: true, declarationDir: `${outputDir}/esm`, rootDir: 'src' }),
      copy({
        targets: [
          {
            src: [
              `${rootDir}/LICENSE.md`,
              `${rootDir}/OSS_NOTICE`,
              `${projectDir}/README.md`,
              '../components/CHANGELOG.md',
            ],
            dest: outputDir,
          },
        ],
      }),
      generatePackageJson({
        inputFolder: 'projects/react-wrapper', // defaults to current working directory, which is the wrong one
        outputFolder: outputDir,
        baseContents: (pkg) => ({
          ...pkg,
          exports: {
            './package.json': './package.json',
            '.': {
              types: './esm/public-api.d.ts',
              import: './esm/public-api.mjs',
              default: './cjs/public-api.cjs',
            },
            './jsdom-polyfill': {
              types: './jsdom-polyfill/index.d.ts',
              default: './jsdom-polyfill/index.cjs',
            },
            './partials': {
              types: './partials/index.d.ts',
              module: './partials/index.js', // support Webpack 4 by pointing `"module"` to a file with a `.js` extension
              default: './partials/index.cjs',
            },
            './ssr': {
              types: './ssr/esm/public-api.d.ts',
              import: './ssr/esm/components-react/projects/react-ssr-wrapper/src/public-api.mjs',
              default: './ssr/cjs/components-react/projects/react-ssr-wrapper/src/public-api.cjs',
            },
            './styles': {
              sass: './styles/_index.scss',
              types: './styles/esm/index.d.ts',
              import: './styles/esm/index.mjs',
              default: './styles/cjs/index.cjs',
            },
            './testing': {
              types: './testing/index.d.ts',
              default: './testing/index.cjs',
            },
          },
        }),
      }),
    ],
    onwarn,
  },
  {
    input: `${projectDir}/src/jsdom-polyfill/index.ts`,
    external,
    output: {
      file: `${outputDir}/jsdom-polyfill/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      // typings are produced by main build
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
      // typings are produced by main build
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
    input: `${projectDir}/src/partials/index.ts`,
    external,
    output: {
      file: `${outputDir}/partials/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      // typings are produced by main build
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
    input: `${projectDir}/src/styles/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/styles/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/styles/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      copy({
        targets: [
          {
            src: `${projectDir}/src/styles/_index.scss`,
            dest: `${outputDir}/styles`,
          },
        ],
      }),
      generatePackageJson({
        outputFolder: `${outputDir}/styles`,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
        },
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
