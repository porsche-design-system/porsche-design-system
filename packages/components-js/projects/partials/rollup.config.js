import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    // Our partials contain jsx. We resolve react/jsx-runtime into the build to make it readable in VanillaJS and Angular.
    plugins: [typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' }), nodeResolve(), commonjs()],
  },
  {
    input,
    external: ['react/jsx-runtime'],
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins: [typescript()],
  },
];
