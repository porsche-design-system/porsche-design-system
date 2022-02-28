import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/js',
      format: 'cjs',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist/js/types', rootDir: 'src' })],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'dist/js/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
