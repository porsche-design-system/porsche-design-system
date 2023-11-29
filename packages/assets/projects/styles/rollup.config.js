import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const outputDir = 'dist';

export default [
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    plugins: [typescript()],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        rootDir: 'src',
      }),
    ],
  },
];
