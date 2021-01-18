import typescript from '@rollup/plugin-typescript';
import pkg from '@porsche-design-system/js/package.json';

const BASE_DIR = 'projects/components-wrapper';
const input = `${BASE_DIR}/src/index.ts`;

const DIST_DIR = 'dist/components-wrapper';
const typescriptOpts = {
  tsconfig: `${BASE_DIR}/tsconfig.json`,
};

export default [
  {
    input: input,
    output: {
      esModule: false,
      dir: DIST_DIR,
      format: 'umd',
      name: pkg.name,
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
    input: input,
    output: { dir: `${DIST_DIR}/esm`, format: 'esm' },
    plugins: [typescript(typescriptOpts)],
  },
];
