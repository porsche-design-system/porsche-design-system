import typescript from '@rollup/plugin-typescript';
import pkg from '@porsche-design-system/js/package.json';

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
  external: ['@porsche-design-system/components-js'],
  output: {
    esModule: false,
    dir: DIST_DIR,
    format: 'umd',
    name: pkg.name,
    exports: 'named',
  },
  plugins: [typescript(typescriptOpts)],
};
