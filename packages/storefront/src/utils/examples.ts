import { type Example, type ExamplePath, examples, examplesPath, mediaPath } from '@porsche-design-system/examples';

/**
 * The examples of `@porsche-design-system/examples`, as the storefront serves them.
 *
 * Two halves come from the examples package. The built pages are copied from `dist-site/` to `public/examples/` in the
 * `prebuild` (`scripts/copyExamples.ts`), and `WebsiteViewer` frames them from there. Every example – its meta and the
 * files of its project, which the code view shows and StackBlitz opens – is imported from the package export by
 * `ExampleViewer` instead, at build time.
 *
 * Both are free of any storefront slug, because one build is deployed under several of them – `release.yml` rebuilds
 * the storefront from one artifact for `/v4.8.0/` and for `/v4/` – so the slug is inserted here, for exactly the build
 * that is deployed under it.
 *
 * Server only: this module imports every example. A client component is handed the example it shows, and adds the
 * origin with `withMediaOrigin()` from `exampleMediaOrigin.ts`.
 */

const withBasePath = (pathname: string, basePath: string): string => (basePath ? `/${basePath}${pathname}` : pathname);

/** Where this deployment serves the media of the examples: `/examples/media/` → `/v4/examples/media/`. */
export const getExampleMediaPath = (basePath: string): string => withBasePath(mediaPath, basePath);

/**
 * Puts the storefront slug in front of every media path: `/examples/media/718.webp` → `/v4/examples/media/718.webp`.
 *
 * Applied to the pages the iframe frames and to the files of the examples alike, so both reference the media of the
 * deployment they are part of. Without a basePath, as in local development, the path is already right.
 */
export const insertBasePath = (content: string, basePath: string): string =>
  basePath ? content.replaceAll(mediaPath, getExampleMediaPath(basePath)) : content;

/**
 * Points the Porsche Design System partials of a page at `serve-cdn`, mirroring what `layout.tsx` does for the
 * storefront itself in development – the locally built components are not on the production CDN.
 */
export const rewriteCdnUrlsForDev = (html: string): string =>
  html.replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

/**
 * The URL of an example in this deployment: `patterns/header/overlay` →
 * `/v4/examples/patterns/header/overlay/index.html`.
 *
 * The file is named, not the folder: the examples are static files in `public/`, and `next dev` serves those by their
 * exact path only – `/examples/…/overlay/` answers 404 there, while the static hosts would resolve it. Root-absolute
 * rather than relative to `<base href>`, so it means the same wherever it is used.
 */
export const getExampleUrl = (example: ExamplePath, basePath: string): string =>
  withBasePath(`${examplesPath}${example}/index.html`, basePath);

/**
 * An example as this deployment shows it: its media below the slug.
 *
 * Fails for a path that is not an example – MDX passes the path as a plain string, so the type alone does not catch a
 * typo there.
 */
export const getExample = <Path extends ExamplePath>(path: Path, basePath: string): Example<Path> => {
  const example: Example<Path> | undefined = examples[path];
  if (!example) {
    throw new Error(`[storefront] "${path}" is not an example of @porsche-design-system/examples`);
  }

  return {
    ...example,
    files: Object.fromEntries(
      Object.entries(example.files).map(([file, content]) => [file, insertBasePath(content, basePath)])
    ),
  };
};
