/**
 * The examples of `@porsche-design-system/examples`, as the storefront serves them.
 *
 * The examples package builds `dist-site/` once, free of any storefront slug, because one build is deployed under
 * several of them – `release.yml` rebuilds the storefront from one artifact for `/v4.8.0/` and for `/v4/`. The
 * storefront copies it to `public/examples/` in its `prebuild` (`scripts/copyExamples.ts`), inserting the slug of
 * exactly the build that is deployed under it, and `WebsiteViewer` frames the pages from there.
 */

/** An example page: its category and its path below it, e.g. `patterns/header/overlay`. */
export type ExamplePath = `${'patterns' | 'templates'}/${string}`;

/**
 * Where the examples reference their media: storefront-root-relative and slug-free.
 *
 * Owned by `packages/examples/src/_media.ts`, repeated here because the storefront does not depend on that package.
 * `copyExamples.ts` fails when the copied pages stop containing it, so the two cannot drift apart silently.
 */
export const examplesMediaPath = '/examples/media/';

/** The StackBlitz payload the examples build writes next to every page: its generated project, verbatim. */
export type ExamplePayload = {
  title: string;
  description: string;
  files: Record<string, string>;
};

const withBasePath = (pathname: string, basePath: string): string => (basePath ? `/${basePath}${pathname}` : pathname);

/**
 * Puts the storefront slug in front of every media path: `/examples/media/718.webp` → `/v4/examples/media/718.webp`.
 *
 * Applied to the pages the iframe frames and to the StackBlitz payloads alike, so both reference the media of the
 * deployment they are part of. Without a basePath, as in local development, the path is already right.
 */
export const insertBasePath = (content: string, basePath: string): string =>
  basePath ? content.replaceAll(examplesMediaPath, withBasePath(examplesMediaPath, basePath)) : content;

/**
 * Points the Porsche Design System partials of a page at `serve-cdn`, mirroring what `layout.tsx` does for the
 * storefront itself in development – the locally built components are not on the production CDN.
 */
export const rewriteCdnUrlsForDev = (html: string): string =>
  html.replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

/**
 * The URL of an example in this deployment: `patterns/header/overlay` → `/v4/examples/patterns/header/overlay/`.
 *
 * Root-absolute rather than relative to `<base href>`, so it means the same wherever it is used.
 */
export const getExampleUrl = (example: ExamplePath, basePath: string): string =>
  withBasePath(`/examples/${example}/`, basePath);

/** The StackBlitz payload of an example, next to its page. */
export const getExamplePayloadUrl = (example: ExamplePath, basePath: string): string =>
  `${getExampleUrl(example, basePath)}stackblitz.json`;

/**
 * The payload as StackBlitz needs it: with the origin in front of every media path.
 *
 * The iframe is same-origin, so `/v4/examples/media/718.webp` is enough there. The WebContainer is not: it loads the
 * media cross-origin from this very deployment, which is why the origin is added here, at click time, rather than at
 * build time – one build serves local development, previews and production, and only the running page knows where
 * it is.
 */
export const withMediaOrigin = (payload: ExamplePayload, origin: string, basePath: string): ExamplePayload => {
  const mediaPath = withBasePath(examplesMediaPath, basePath);

  return {
    ...payload,
    files: Object.fromEntries(
      Object.entries(payload.files).map(([file, content]) => [
        file,
        content.replaceAll(mediaPath, `${origin}${mediaPath}`),
      ])
    ),
  };
};
