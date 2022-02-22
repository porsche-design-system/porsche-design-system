import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const input = 'src/index.ts';

export default [
  {
    input,
    // Packages that use the partials via node are not able to read esm syntax, therefore we need a cjs build
    output: {
      esModule: false,
      dir: 'dist',
      format: 'cjs',
      name: pkg.name,
      exports: 'named',
    },
    // Our partials return jsx from react/jsx-runtime. We need to resolve the dependency into the build to make it readable in VanillaJS and Angular.
    plugins: [typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }), nodeResolve(), commonjs()],
  },
  {
    input,
    external: ['react/jsx-runtime'],
    // To be treeshakable we need a esm build. See https://webpack.js.org/guides/tree-shaking/#conclusion
    output: { dir: 'dist/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
