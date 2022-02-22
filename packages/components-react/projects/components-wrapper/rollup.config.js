import typescript from '@rollup/plugin-typescript';

const BASE_DIR = 'projects/components-wrapper';
const input = `${BASE_DIR}/src/public-api.ts`;

const DIST_DIR = 'dist/components-wrapper';
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
      exports: 'named',
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
      exports: 'named',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${BASE_DIR}/src/partials.ts`,
    external,
    // Partials provide esm build which is treeshakable. By bundling it as esm, the correct build is used.
    output: {
      dir: DIST_DIR,
      format: 'esm',
      exports: 'named',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${BASE_DIR}/src/testing.ts`,
    external: ['@testing-library/dom'],
    output: {
      dir: DIST_DIR,
      format: 'cjs',
      exports: 'named',
    },
    plugins: [typescript(typescriptOpts)],
  },
];
