import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';

// Config to build static demo-app
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          getFontLinks: require('@porsche-design-system/components-js/partials').getFontLinks(),
          getInitialStyles: require('@porsche-design-system/components-js/partials').getInitialStyles(),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: './dist/demo-app',
  },
});
