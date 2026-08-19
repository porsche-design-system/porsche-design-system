import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import { patternComponents, templateComponents } from './projects.ts';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

/** Title shown by the meta tags partial, used by the dev server and by every generated project. */
export const appTitle = 'Examples by Porsche Design System';

/**
 * The Porsche Design System partials, injected by the dev server only.
 *
 * The pages use web components, so without the loader script nothing upgrades – and `:not(:defined)` in
 * `assets/styles.css` would keep the whole page invisible. The **build** does not inject anything: its output is the
 * source of two Vite projects, whose generated `vite.config.ts` injects the very same partials when they are built.
 *
 * The dev server serves both categories at once, so it preloads the union of their component chunks.
 */
export const injectPartials = (html: string): string => {
  const headPartials = [
    getComponentChunkLinks({ components: [...new Set([...patternComponents, ...templateComponents])] }),
    getFontLinks(),
    getIconLinks(),
    getMetaTagsAndIconLinks({ appTitle }),
  ].join('');

  // Injected after the formatting pass of `renderPage()`, so the inline loader script stays byte for byte what the
  // partial emitted – reformatting it would invalidate its CSP hash.
  return html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${getLoaderScript()}$&`);
};

/**
 * The partials always emit absolute production CDN URLs (https://cdn.ui.porsche.com/porsche-design-system/...).
 *
 * In dev the locally built assets are served by `serve-cdn` on http://localhost:3001, so the URLs are rewritten to
 * that origin – otherwise the browser fetches from the production CDN and the cross-origin loader script is blocked
 * by CORS. This mirrors the same rewrite used by the other wrapper dev servers (react/angular/vue/storefront).
 */
export const rewriteCdnUrlsForDev = (html: string): string =>
  html.replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');
