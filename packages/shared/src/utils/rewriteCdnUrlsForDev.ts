/**
 * The partials always emit absolute production CDN URLs (https://cdn.ui.porsche.com/porsche-design-system/... or
 * https://cdn.ui.porsche.cn/porsche-design-system/...).
 *
 * In dev the locally built assets are served by `serve-cdn` on http://localhost:3001, so the URLs are rewritten to
 * that origin. Otherwise the browser fetches from the production CDN and the cross-origin loader script is blocked
 * by CORS. This mirrors the same rewrite used by the other wrapper dev servers (react/angular/vue/storefront).
 */
export const rewriteCdnUrlsForDev = (html: string): string =>
  html.replace(/https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system/g, 'http://localhost:3001');
