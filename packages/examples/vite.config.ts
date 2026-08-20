import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';
import { jsxPages } from './plugins/jsx.ts';
import { injectPartials, rewriteCdnUrlsForDev } from './plugins/partials.ts';

/**
 * The dev server counterpart of `scripts/build.ts`.
 *
 * The build writes two Vite projects whose pages load a generated `main.js`; here nothing is generated, so that tag is
 * rewritten to the shared files of the source tree. That rewrite happens in `plugins/jsx.ts`, before the markup reaches
 * `server.transformIndexHtml()`, because Vite's own HTML hook would otherwise try to load the file that does not exist
 * yet. What is left for a plugin hook are the partials, which are injected the same way in both, only the CDN origin
 * differs – see `plugins/partials.ts`.
 *
 * They are injected here rather than in the middleware on purpose: a `transformIndexHtml()` hook runs after Vite's own,
 * so the inline loader script stays byte for byte what the partial emitted and its CSP hash keeps matching.
 */
const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string): string {
      return rewriteCdnUrlsForDev(injectPartials(html));
    },
  };
};

// Dev server only – the production output is written by `scripts/build.ts`, which emits the source of two standalone
// Vite projects instead of a built site.
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: '../public',
  server: {
    port: 3010,
    open: '/',
  },
  css: {
    transformer: 'lightningcss',
    // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  plugins: [jsxPages(), transformIndexHtmlPlugin(), tailwindcss()],
});
