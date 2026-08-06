import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import bin from 'rollup-plugin-bin';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
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
  '@porsche-design-system/components-js/tokens',
  '@porsche-design-system/components-js/emotion',
  '@porsche-design-system/components-js/meta',
  '@porsche-design-system/components-js/ag-grid',
  '@porsche-design-system/components-js/scss',
  '@porsche-design-system/components-js/vanilla-extract',
  '@porsche-design-system/components-js/testing',
  'react',
  'react/jsx-runtime',
];

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
        // `exports` and `style` are defined in the source package.json (single source of truth, like components-js),
        // so they are kept here simply by spreading `...pkg`.
        baseContents: (pkg) => ({
          ...pkg,
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
    output: [
      {
        file: `${outputDir}/partials/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/partials/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/partials`,
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
  {
    input: `${projectDir}/src/tokens/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/tokens/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/tokens/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/tokens`,
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
    input: `${projectDir}/src/emotion/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/emotion/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/emotion/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/emotion`,
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
    input: `${projectDir}/src/meta/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/meta/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/meta/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      generatePackageJson({
        outputFolder: `${outputDir}/meta`,
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
    input: `${projectDir}/src/vanilla-extract/index.ts`,
    external,
    output: [
      {
        file: `${outputDir}/vanilla-extract/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/vanilla-extract/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      // typings are produced by main build
      typescript(typescriptOpts),
      // SCSS
      copy({
        targets: [
          {
            src: `${projectDir}/src/scss/_index.scss`,
            dest: `${outputDir}/scss`,
          },
        ],
      }),
      generatePackageJson({
        outputFolder: `${outputDir}/vanilla-extract`,
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
