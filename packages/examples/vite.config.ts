import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';
import { jsxPages } from './lib/jsx.ts';
import { injectPartials, rewriteCdnUrlsForDev } from './lib/partials.ts';

/**
 * The dev server counterpart of `scripts/build.ts`.
 *
 * The build moves the scripts of a page into a generated `main.js`; here nothing is generated, so the page keeps its
 * inline scripts, which Vite serves as modules itself, and `lib/jsx.ts` links the shared stylesheet. What is left
 * for a plugin hook are the partials, which are injected the same way in both, only the CDN origin differs – see
 * `lib/partials.ts`.
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

// Dev server only – the production output is written by `scripts/build.ts`, which emits the source of one standalone
// Vite project per page instead of a built site.
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: '../public',
  // No `open`: there is no page at the root – the URL of every page is listed when the server starts.
  server: {
    port: 3010,
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
