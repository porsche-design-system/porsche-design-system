import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'dist';
const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      file: `${outputDir}/index.cjs`,
      format: 'cjs',
    },
    // we bundle react/jsx-runtime to make it work with vanilla js and angular
    // that otherwise can't resolve the dependency
    plugins: [
      commonjs(),
      resolve(),
      typescript({ declaration: true, declarationDir: outputDir, rootDir: 'src' }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'index.cjs',
          types: 'index.d.ts',
          sideEffects: false,
        },
      }),
    ],
  },
];
