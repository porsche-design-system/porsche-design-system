import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';

export default [
  {
    input,
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
    ],
    plugins: [typescript({ declaration: true, declarationDir: 'dist', rootDir: 'src' })],
  },
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins: [typescript()],
  },
];
