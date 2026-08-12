import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { nunjucksHtml } from './plugins/nunjucks.ts';

// Dev server only – the production output is written by `scripts/build.ts` so it stays plain HTML.
// Tailwind runs through the Vite plugin here and through the CLI in the build (see the `build:css` script).
// Port 3008 (3006/3007 belong to the `patterns-html` twin, so both can run side by side).
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: false,
  server: {
    port: 3008,
    open: '/',
  },
  plugins: [nunjucksHtml(), tailwindcss()],
});
