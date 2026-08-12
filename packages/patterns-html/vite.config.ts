import { defineConfig } from 'vite';
import { htmlInclude } from './plugins/htmlInclude.ts';

// Dev server only – the production output is written by `scripts/build.ts` so it stays plain HTML.
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: false,
  server: {
    port: 3006,
    open: '/',
  },
  plugins: [htmlInclude()],
});
