import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

/**
 * The Porsche Design System partials, shared by the dev server and the build.
 *
 * The pages use web components, so without the loader script nothing upgrades – and `:not(:defined)` in
 * `assets/styles.css` would keep the whole page invisible. It therefore cannot live in the Vite config alone: the
 * production output is written by `scripts/build.ts`, which does not run Vite at all.
 */
export const injectPartials = (html: string): string => {
  const headPartials = [
    // `drilldown` covers its item and link chunks; the icons of the header come with `button-pure`.
    getComponentChunkLinks({
      components: [
        'button',
        'button-pure',
        'crest',
        'drilldown',
        'heading',
        'link',
        'link-pure',
        'tabs-bar',
        'text',
        'wordmark',
      ],
    }),
    getFontLinks(),
    getIconLinks(),
    getMetaTagsAndIconLinks({ appTitle: 'Examples by Porsche Design System' }),
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
