/**
 * The categories of examples and the projects the build emits for them – one per page.
 *
 * `dist/` holds the **source** of one standalone Vite project per page. It is the project "Open in StackBlitz" hands
 * over, and the very project `scripts/buildSite.ts` builds into the single HTML file the storefront frames, so what
 * the viewer shows is what StackBlitz builds:
 *
 * ```text
 * dist/patterns/header/overlay/   # one project, `npm run build` builds it
 * ├── package.json                # generated
 * ├── vite.config.ts              # generated, injects the PDS partials
 * ├── index.html
 * ├── main.js                     # generated: the stylesheet import and the behaviour of the example
 * └── style.css                   # the shared Tailwind entry, copied
 * ```
 *
 * A project has no `public/` and no `assets/` folder: the media are served by the storefront (see `mediaPath`),
 * the shared Tailwind entry is copied next to every page and the behaviour is written in the page's components, so an
 * example is read in one place.
 */

/**
 * The component chunks preloaded by the pattern pages.
 *
 * `drilldown` covers its item and link chunks, `select` covers its options and `segmented-control` its items; the
 * icons of the header come with `button-pure`. A `popover` and the `sheet` it turns into below `s` are separate
 * chunks, as is the `tag` used as a counter and the `modal` the feedback pattern asks in. Preloading is an
 * optimisation, so a missing entry costs a round trip, not correctness – but keep the list in sync with the `p-*`
 * elements the pages actually render.
 */
export const patternComponents = [
  'button',
  'button-pure',
  'crest',
  'drilldown',
  'flag',
  'heading',
  'link',
  'link-pure',
  'modal',
  'optgroup',
  'popover',
  'segmented-control',
  'select',
  'sheet',
  'tabs-bar',
  'tag',
  'text',
  'textarea',
  'wordmark',
] as const;

/**
 * The component chunks preloaded by the template pages – the full chrome plus the content components.
 *
 * The second half belongs to the admin panel, whose shell is a `canvas`: everything its sidebars, its list of models
 * and its search dialog are built from. `table` covers its head, row and cell chunks, `select` its options.
 */
export const templateComponents = [
  ...patternComponents,
  'accordion',
  'canvas',
  'carousel',
  'checkbox',
  'divider',
  'input-search',
  'link-tile',
  'table',
] as const;

export type ProjectCategory = 'patterns' | 'templates';

export type Category = {
  category: ProjectCategory;
  /** Preloaded component chunks, written into the generated Vite config of every page of the category. */
  components: readonly string[];
};

export const categories: Category[] = [
  { category: 'patterns', components: patternComponents },
  { category: 'templates', components: templateComponents },
];

/** Where the storefront serves the built pages, relative to its root: `/examples/patterns/header/overlay/`. */
export const examplesPath = '/examples/';

/**
 * Where the images and videos of the examples are served from – and the path the pages write them with, as a literal:
 * `src="/examples/media/718.webp"`.
 *
 * The storefront serves the examples from `public/examples/`, with the media once in `public/examples/media/`, so the
 * path is relative to the root of a storefront and free of its slug. The slug is added when the storefront copies the
 * built pages in, because one build is deployed under several slugs; StackBlitz additionally gets the origin in front,
 * because it loads the media cross-origin. The dev server of this package serves `public/` at its root, which is why
 * the files live in `public/examples/media/` here as well – the same path works in both without a rewrite.
 *
 * `scripts/verify.ts` fails the build on any other root-absolute URL in a page, and on a file that does not exist.
 */
export const mediaPath = `${examplesPath}media/`;

/** Port `scripts/previewSite.ts` serves the built site on, next to the dev server of the source tree (3010). */
export const previewPort = 3011;

/** Name of the StackBlitz payload written next to every built page. */
export const payloadName = 'stackblitz.json';

/** Name of the generated script entry of a page, the only script its HTML references. */
export const scriptEntryName = 'main.js';

/**
 * Name of the style entry of a page, imported by the script entry – and of the shared Tailwind entry at the root of
 * `src/`, which is copied under this very name and linked by the dev server.
 */
export const styleEntryName = 'style.css';

/** A page of one of the categories – and with that, one generated project. */
export type PageLocation = {
  category: ProjectCategory;
  /** Path of the page relative to the root of its category, e.g. `'header/overlay'`. Never empty. */
  pageDir: string;
};

/**
 * Maps a source path to the page it renders.
 *
 * `patterns/header/overlay/index.page.tsx` → `{ category: 'patterns', pageDir: 'header/overlay' }`.
 * Returns `undefined` for anything that is not a page of a category: a page outside the category folders belongs to
 * no project, and a page at the root of a category is not supported – `scripts/build.ts` rejects it.
 */
export const resolvePageLocation = (relativePath: string): PageLocation | undefined => {
  const [category, ...rest] = relativePath.split('/');

  // The last segment is the file name (`index.page.tsx`), everything between it and the category is the page folder.
  if (!categories.some((entry) => entry.category === category) || rest.length < 2) {
    return undefined;
  }

  return { category: category as ProjectCategory, pageDir: rest.slice(0, -1).join('/') };
};

/**
 * Stable name of a page across categories: `{ category: 'patterns', pageDir: 'header/overlay' }` →
 * `'patterns-header-overlay'`. It names the generated package and prefixes the VRT snapshots of the page.
 */
export const getPageId = ({ category, pageDir }: PageLocation): string => `${category}-${pageDir.replaceAll('/', '-')}`;
