import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/js/index.ts';
const outputDir = 'dist';

export default [
  {
    input,
    output: {
      dir: `${outputDir}/js`,
      format: 'cjs',
      preserveModules: true,
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
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/js`,
        exclude: '**.spec.ts',
        rootDir: 'src/js',
      }),
    ],
  },
  {
    input,
    output: {
      dir: `${outputDir}/js/esm`,
      format: 'esm',
      preserveModules: true,
    },
    plugins: [
      copy({
        targets: [{ src: `src/scss/**/*.scss`, dest: outputDir }],
        flatten: false,
      }),
      typescript(),
    ],
  },
];
