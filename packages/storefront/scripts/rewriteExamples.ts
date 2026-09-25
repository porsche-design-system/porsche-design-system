/**
 * Rewrites applied to the built examples when the storefront copies them into `public/examples/`.
 *
 * `@porsche-design-system/examples` builds `dist-site/` once, free of any storefront slug, because one build is deployed
 * under several of them – `release.yml` rebuilds the storefront from one artifact for `/v4.8.0/` and for `/v4/`. The
 * slug is therefore inserted here, in the `prebuild` of exactly the storefront build that is deployed under it.
 */

/**
 * Where the examples reference their media: storefront-root-relative and slug-free.
 *
 * Owned by `packages/examples/src/_media.ts`, repeated here because the storefront does not depend on that package.
 * `copyExamples.ts` fails when the copied pages stop containing it, so the two cannot drift apart silently.
 */
export const examplesMediaPath = '/examples/media/';

/**
 * Puts the storefront slug in front of every media path: `/examples/media/718.webp` → `/v4/examples/media/718.webp`.
 *
 * Applied to the pages the iframe frames and to the StackBlitz payloads alike, so both reference the media of the
 * deployment they are part of. Without a basePath, as in local development, the path is already right.
 */
export const insertBasePath = (content: string, basePath: string): string =>
  basePath ? content.replaceAll(examplesMediaPath, `/${basePath}${examplesMediaPath}`) : content;

/**
 * Points the Porsche Design System partials of a page at `serve-cdn`, mirroring what `layout.tsx` does for the
 * storefront itself in development – the locally built components are not on the production CDN.
 */
export const rewriteCdnUrlsForDev = (html: string): string =>
  html.replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');
