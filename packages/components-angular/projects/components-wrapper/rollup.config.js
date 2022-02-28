import typescript from '@rollup/plugin-typescript';

const BASE_DIR = 'projects/components-wrapper';
const DIST_DIR = 'dist/components-wrapper';

const typescriptOpts = {
  tsconfig: `${BASE_DIR}/tsconfig.json`,
  declaration: true,
  declarationDir: DIST_DIR,
  rootDir: 'src',
};

export default {
  input: `${BASE_DIR}/src/partials.ts`,
  external: ['@porsche-design-system/components-js', '@porsche-design-system/components-js/partials'],
  output: {
    dir: DIST_DIR,
    format: 'cjs',
  },
  plugins: [typescript(typescriptOpts)],
};
