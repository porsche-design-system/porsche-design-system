import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  css: {
    transformer: 'lightningcss',
    // disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  plugins: [react(), tailwindcss(), vanillaExtractPlugin()],
});
