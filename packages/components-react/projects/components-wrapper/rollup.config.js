import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const BASE_DIR = 'projects/components-wrapper';
const DIST_DIR = 'dist/components-wrapper';
const input = `${BASE_DIR}/src/public-api.ts`;

const typescriptOpts = {
  tsconfig: `${BASE_DIR}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/partials',
  'react',
  'react/jsx-runtime',
];

export default [
  {
    input,
    external,
    output: {
      dir: DIST_DIR,
      format: 'cjs',
    },
    plugins: [
      typescript({
        ...typescriptOpts,
        declaration: true,
        declarationDir: DIST_DIR,
        rootDir: 'src',
      }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: `${DIST_DIR}/esm`,
      format: 'esm',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${BASE_DIR}/src/partials.ts`,
    external,
    output: [
      {
        file: `${DIST_DIR}/partials/index.js`,
        format: 'cjs',
        plugins: [
          generatePackageJson({
            baseContents: {
              main: 'index.js',
              module: 'esm/index.js',
              sideEffects: false,
            },
          }),
        ],
      },
      {
        file: `${DIST_DIR}/partials/esm/index.js`,
        format: 'esm',
      },
    ],
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${BASE_DIR}/src/testing.ts`,
    external: ['@testing-library/dom'],
    output: {
      dir: DIST_DIR,
      format: 'cjs',
    },
    plugins: [typescript(typescriptOpts)],
  },
];
