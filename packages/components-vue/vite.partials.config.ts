import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';

const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/partial';
const input = `${projectDir}/src/partials.ts`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
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
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
