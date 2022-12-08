import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const rootDir = '../..';
const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper';
const input = `${projectDir}/src/public-api.ts`;

// https://vitejs.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   include: ['@porsche-design-system/components-js'],
  // },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(input),
      name: '@porsche-design-system/components-vue',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue', '@porsche-design-system/components-js'],
      output: {
        dir: path.resolve(outputDir),
        preserveModules: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
