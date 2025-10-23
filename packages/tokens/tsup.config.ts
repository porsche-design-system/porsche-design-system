import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  clean: true,
  dts: true,
  bundle: false,
  format: ['cjs', 'esm'],
  skipNodeModulesBundle: true,
  target: 'esnext',
  outDir: 'dist',
  entry: ['src/**/*.ts', '!src/**/*.spec.ts'],
});
