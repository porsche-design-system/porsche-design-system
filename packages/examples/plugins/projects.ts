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
 * A project has no `public/` and no `assets/` folder: the media are served by the storefront (see `src/_media.ts`),
 * and the shared Tailwind entry and the shared behaviour are inlined into the entries of the pages that need them, so
 * an example is read in one place.
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

/** The category of a name, for the code addressing one of them by it. */
export const getCategory = (category: string): Category | undefined =>
  categories.find((entry) => entry.category === category);

/** Port `scripts/previewSite.ts` serves the built site on, next to the dev server of the source tree (3010). */
export const previewPort = 3011;

/** Name of the StackBlitz payload written next to every built page. */
export const payloadName = 'stackblitz.json';

/** Name of the generated script entry of a page, the only script its HTML references. */
export const scriptEntryName = 'main.js';

/** Name of the generated style entry of a page, imported by the script entry. */
export const styleEntryName = 'style.css';

/** The folder of the source tree holding what every page shares – build inputs only, never emitted. */
export const assetsDirName = 'assets';

/** The shared Tailwind entry inside that folder, inlined into every page's `style.css` and linked by the dev server. */
export const sharedStyleName = 'styles.css';

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
 * Returns `undefined` for anything that is not a page of a category: the root overview page is the dev server's entry
 * point and is never emitted, and a page at the root of a category is not supported – `scripts/build.ts` rejects it.
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
