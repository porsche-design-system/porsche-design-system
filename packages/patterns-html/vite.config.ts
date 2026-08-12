import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { htmlInclude } from './plugins/htmlInclude.ts';

// Dev server only – the production output is written by `scripts/build.ts` so it stays plain HTML.
// Tailwind runs through the Vite plugin here and through the CLI in the build (see the `build:css` script).
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: false,
  server: {
    port: 3006,
    open: '/',
  },
  plugins: [htmlInclude(), tailwindcss()],
});
