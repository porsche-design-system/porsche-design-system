import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';

const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper/utilities';
const utilitiesDir = `${projectDir}/src/utilities`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(utilitiesDir, 'scss.scss'),
          dest: path.resolve(outputDir),
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(utilitiesDir, 'js.ts'),
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
