import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const input = 'src/js/index.ts';
const outputDir = 'dist';

export default [
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [typescript()],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src/js',
      }),
      copy({
        targets: [{ src: ['src/scss/**/*.scss', 'src/_index.scss'], dest: outputDir }],
        flatten: false,
      }),
    ],
  },
];
