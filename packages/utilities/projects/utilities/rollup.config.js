import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/jss/index.ts',
    output: {
      dir: 'dist/jss',
      format: 'cjs',
    },
    plugins: [typescript({ declaration: true, declarationDir: 'dist/jss/types', rootDir: 'src/jss' })],
  },
  {
    input: 'src/jss/index.ts',
    output: { dir: 'dist/jss/esm', format: 'esm' },
    plugins: [typescript()],
  },
];
