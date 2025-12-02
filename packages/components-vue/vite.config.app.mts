import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as partials from '@porsche-design-system/components-vue/partials';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// Config to build static demo-app
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vanillaExtractPlugin(),
    createHtmlPlugin({
      inject: {
        data: {
          headPartials: [
            partials.getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
          ]
            .join('\n')
            .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    outDir: './dist/demo-app',
  },
});
