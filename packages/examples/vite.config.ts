import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';
import { getSharedScripts, rewriteEntriesForDev } from './plugins/entries.ts';
import { jsxPages, resolvePagePath } from './plugins/jsx.ts';
import { injectPartials, rewriteCdnUrlsForDev } from './plugins/partials.ts';
import { scriptEntryName } from './plugins/projects.ts';

const rootDir = path.join(import.meta.dirname, 'src');

/**
 * The dev server counterpart of `scripts/build.ts`.
 *
 * The build writes two Vite projects whose pages load a generated `main.js`; here nothing is generated, so that tag is
 * rewritten to the shared files of the source tree – see `plugins/entries.ts`. The partials are injected the same way
 * in both, only the CDN origin differs – see `plugins/partials.ts`.
 */
const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string, ctx: { path: string }): string {
      const pagePath = resolvePagePath(ctx.path);
      const hasBehaviour = !!pagePath && fs.existsSync(path.join(rootDir, path.dirname(pagePath), scriptEntryName));

      return rewriteCdnUrlsForDev(
        injectPartials(rewriteEntriesForDev(html, { hasBehaviour, sharedScripts: getSharedScripts(html) }))
      );
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
