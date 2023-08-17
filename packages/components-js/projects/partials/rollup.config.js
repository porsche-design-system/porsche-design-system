import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const outputDir = 'dist';
const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      file: `${outputDir}/cjs/index.cjs`,
      format: 'cjs',
    },
    // we bundle react/jsx-runtime to make it work with vanilla js and angular
    // that otherwise can't resolve the dependency
    plugins: [commonjs(), resolve(), typescript()],
  },
  {
    input,
    external: ['react/jsx-runtime'],
    output: {
      file: `${outputDir}/esm/index.mjs`,
      format: 'esm',
    },
    plugins: [typescript({ declaration: true, declarationDir: `${outputDir}/esm`, rootDir: 'src' })],
  },
];
