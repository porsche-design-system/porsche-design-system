import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/],
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [...commonPlugins, typescript({ declaration: true, declarationDir: 'dist/types', rootDir: 'src' })],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'dist/esm', format: 'esm' },
    plugins: [...commonPlugins, typescript()],
  },
];
