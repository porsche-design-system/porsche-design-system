// @ts-check
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

/** @type {import('rollup').RollupOptions} */
export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      exclude: ['**/*.spec.ts'],
    }),
  ],
});
