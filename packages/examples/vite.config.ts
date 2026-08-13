import { getLoaderScript } from '@porsche-design-system/components-js/partials';
import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { defineConfig } from 'vite';
import { jsxPages } from './plugins/jsx.ts';
import { injectPartials, rewriteCdnUrlsForDev } from './plugins/partials.ts';

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string): string {
      // biome-ignore lint/correctness/noUnusedVariables: can be re-enabled when config is extended to support home & nav
      const cspContent = [
        `default-src 'self' https://cdn.ui.porsche.com`,
        `style-src 'self' https://cdn.ui.porsche.com 'unsafe-inline'`,
        `script-src 'self' https://cdn.ui.porsche.com ${getLoaderScript({ format: 'sha256' })}`,
        `img-src 'self' https://cdn.ui.porsche.com https://porsche-design-system.github.io data:`, // data: is needed for inline background images, e.g. used in checkbox-wrapper and radio-button-wrapper
        `media-src 'self' https://porsche-design-system.github.io`, // the mood videos of the examples are hosted there
      ].join('; ');

      // The very same partials the build injects – only the CDN origin differs, see `plugins/partials.ts`.
      return rewriteCdnUrlsForDev(injectPartials(html));
    },
  };
};

// Dev server only – the production output is written by `scripts/build.ts` so it stays plain HTML.
// Tailwind runs through the Vite plugin here and through the CLI in the build (see the `build:css` script).
export default defineConfig({
  root: 'src',
  appType: 'mpa',
  publicDir: false,
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
