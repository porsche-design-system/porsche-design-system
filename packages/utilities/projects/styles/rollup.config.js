import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const outputDir = 'dist/js';

export default [
  {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/types`,
        rootDir: 'src',
      }),
    ],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
    },
    plugins: [typescript()],
  },
];
