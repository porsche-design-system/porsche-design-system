import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/],
  }),
];

export default [
  {
    input: 'src/js/index.ts',
    output: {
      dir: 'dist/js',
      format: 'cjs',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [...commonPlugins, typescript({ declaration: true, declarationDir: 'dist/js/types', rootDir: 'src/js' })],
  },
  {
    input: 'src/js/index.ts',
    output: { dir: 'dist/js/esm', format: 'esm' },
    plugins: [...commonPlugins, typescript()],
  },
];
