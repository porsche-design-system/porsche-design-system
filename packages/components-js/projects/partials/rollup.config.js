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
      dir: outputDir,
      format: 'cjs',
      plugins: [
        generatePackageJson({
          baseContents: {
            main: 'index.js',
            module: 'esm/index.js',
            types: 'index.d.ts',
            sideEffects: false,
          },
        }),
      ],
    },
    // Our partials contain jsx. We bundle react/jsx-runtime into the build to make it work in VanillaJS and Angular.
    plugins: [commonjs(), resolve(), typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' })],
  },
  {
    input,
    external: ['react/jsx-runtime'],
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
    },
    plugins: [typescript()],
  },
];
