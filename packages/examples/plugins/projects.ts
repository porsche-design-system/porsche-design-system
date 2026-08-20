/**
 * The two projects the build emits, one per category.
 *
 * `dist/` is not a website: it is the **source** of two standalone Vite projects that replace the hand written
 * `patterns` and `templates` workspaces of the examples repository. Each one is self contained – own `package.json`,
 * own `vite.config.ts`, own copy of everything its pages share – because the examples repository does not allow cross
 * workspace imports.
 *
 * ```text
 * dist/patterns/            # workspace root, `npm run build` builds it
 * ├── package.json          # generated
 * ├── vite.config.ts        # generated, literal rollup inputs, injects the PDS partials
 * ├── public/               # copied verbatim
 * └── src/                  # `root` of the Vite project
 *     ├── index.html        # the overview of this category
 *     └── header/overlay/   # index.html + style.css + main.js
 * ```
 *
 * There is no `assets/` folder: the shared Tailwind entry and the shared behaviour are inlined into the entries of the
 * pages that need them, so an example is read in one place.
 */

/**
 * The component chunks preloaded by the pattern pages.
 *
 * `drilldown` covers its item and link chunks, `select` covers its options; the icons of the header come with
 * `button-pure`. Preloading is an optimisation, so a missing entry costs a round trip, not correctness – but keep the
 * list in sync with the `p-*` elements the pages actually render.
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
  'optgroup',
  'select',
  'tabs-bar',
  'text',
  'wordmark',
] as const;

/** The component chunks preloaded by the template pages – the full chrome plus the content components. */
export const templateComponents = [...patternComponents, 'carousel', 'link-tile'] as const;

export type ProjectCategory = 'patterns' | 'templates';

export type Project = {
  category: ProjectCategory;
  /** Workspace name in the examples repository, so a generated project can replace the manual one in place. */
  packageName: string;
  /** Accessible name of the link list on the overview page. */
  label: string;
  description: string;
  /** Environment variable the deployment sets to serve the project from a sub path. */
  baseEnvVariable: string;
  /**
   * Port `scripts/previewProject.ts` serves the built project on, next to the dev server of the source tree (3010).
   * Internal to this package: it is not written into the generated project, which keeps Vite's own default.
   */
  previewPort: number;
  /** Preloaded component chunks, written into the generated Vite config. */
  components: readonly string[];
};

export const projects: Project[] = [
  {
    category: 'patterns',
    packageName: '@porsche-design-system/patterns',
    label: 'Patterns',
    description: 'Single sections, shown in the place they occupy on a real page.',
    baseEnvVariable: 'PATTERNS_PUBLIC_BASE_PATH',
    previewPort: 3011,
    components: patternComponents,
  },
  {
    category: 'templates',
    packageName: '@porsche-design-system/templates',
    label: 'Templates',
    description: 'Whole pages, from the skip link to the footer.',
    baseEnvVariable: 'TEMPLATES_PUBLIC_BASE_PATH',
    previewPort: 3012,
    components: templateComponents,
  },
];

/** The project of a category, for the scripts addressing one of them by name. */
export const getProject = (category: string): Project | undefined =>
  projects.find((project) => project.category === category);

/** Name of the generated script entry of a page, the only script its HTML references. */
export const scriptEntryName = 'main.js';

/** Name of the generated style entry of a page, imported by the script entry. */
export const styleEntryName = 'style.css';

/** The folder of the source tree holding what every page shares – build inputs only, never emitted. */
export const assetsDirName = 'assets';

/** The shared Tailwind entry inside that folder, inlined into every page's `style.css` and linked by the dev server. */
export const sharedStyleName = 'styles.css';

/** A page inside one of the projects. */
export type PageLocation = {
  category: ProjectCategory;
  /**
   * Path of the page relative to the project root: `''` for the overview page of a category,
   * `'header/overlay'` for a page inside it.
   */
  pageDir: string;
};

/**
 * Maps a source path to the project it belongs to.
 *
 * `patterns/header/overlay/index.page.tsx` → `{ category: 'patterns', pageDir: 'header/overlay' }`.
 * Returns `undefined` for anything outside a category – the root overview page is the dev server's entry point and
 * belongs to neither project.
 */
export const resolvePageLocation = (relativePath: string): PageLocation | undefined => {
  const [category, ...rest] = relativePath.split('/');

  if (!projects.some((project) => project.category === category) || rest.length === 0) {
    return undefined;
  }

  // The last segment is the file name (`index.page.tsx`), everything between it and the category is the page folder.
  return { category: category as ProjectCategory, pageDir: rest.slice(0, -1).join('/') };
};

/**
 * Rollup input name of a page: `''` → `'index'`, `'header/overlay'` → `'header-overlay'`.
 *
 * A page sits as deep below its category root in both trees (`src/patterns/header/overlay` and
 * `dist/patterns/src/header/overlay`), so nothing else has to translate paths between them.
 */
export const getInputName = (pageDir: string): string => (pageDir === '' ? 'index' : pageDir.replaceAll('/', '-'));
