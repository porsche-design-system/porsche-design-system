import typescript from '@rollup/plugin-typescript';

const BASE_DIR = 'projects/components-wrapper';
const input = `${BASE_DIR}/src/index.ts`;

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
        declarationDir: `${DIST_DIR}/types`,
        rootDir: 'src',
      }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: `${DIST_DIR}/esm`,
      format: 'es',
      exports: 'named',
    },
    plugins: [typescript(typescriptOpts)],
  },
  {
    input: `${BASE_DIR}/src/partials.ts`,
    external,
    output: {
      dir: DIST_DIR,
      format: 'es',
      exports: 'named',
    },
    plugins: [typescript(typescriptOpts)],
  },
];
