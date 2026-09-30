/**
 * Where the images and videos of the examples are served from.
 *
 * The storefront serves the examples from `public/examples/`, with the media once in `public/examples/media/`, so a
 * page references `/examples/media/718.webp`: relative to the root of a storefront, and free of its slug. The slug is
 * added when the storefront copies the built pages in, because one build is deployed under several slugs; StackBlitz
 * additionally gets the origin in front, because it loads the media cross-origin.
 *
 * The dev server of this package serves `public/` at its root, which is why the files live in
 * `public/examples/media/` here as well – the same path works in both without a rewrite.
 */
export const mediaPath = '/examples/media/';

/** Where the storefront serves the built pages, relative to its root: `/examples/patterns/header/overlay/`. */
export const examplesPath = '/examples/';

/**
 * The URL of a media file of the examples: `media('718.webp')` → `/examples/media/718.webp`.
 *
 * Every image, poster and video source goes through this helper instead of spelling the path out, so the one prefix
 * the storefront rewrites is the only root-absolute URL a page contains. `scripts/verify.ts` fails the build on any
 * other one, and on a file that does not exist.
 */
export const media = (fileName: string): string => `${mediaPath}${fileName}`;
