import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';

const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper';
const input = `${projectDir}/src/public-api.ts`;

const destinationDir = path.resolve(outputDir);

// Config to build vue-wrapper components library
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    lib: {
      entry: path.resolve(input),
      name: '@porsche-design-system/components-vue',
    },
    rollupOptions: {
      external: ['vue', '@porsche-design-system/components-js'],
      output: [
        {
          dir: `${destinationDir}/esm`,
          format: 'esm',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          globals: {
            vue: 'Vue',
          },
        },
        {
          dir: `${destinationDir}/cjs`,
          format: 'cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
  },
});
