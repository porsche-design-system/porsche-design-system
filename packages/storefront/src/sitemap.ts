import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName, TagNameWithChunk } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';

/**
 * The Storefront's categories, their pages and the pages' tabs, as plain data: the navigation, the tabs and the search
 * index render it, and it can be read without React. `tests/unit/specs/sitemap.spec.ts` checks it against the pages in
 * `src/app`, in both directions.
 *
 * The keys are the segments of the paths: `sitemap.news.pages.changelog` is `/news/changelog` (see `getPath`).
 */

export type Tab = { name: string };

export type Page = {
  name: string;
  /** The component the page documents */
  tagName?: TagName;
  tabs?: Record<string, Tab>;
};

export type Category = {
  name: string;
  pages: Record<string, Page>;
};

/** Components without an Examples tab. Every other tab exists for every component. */
const COMPONENTS_WITHOUT_EXAMPLES: TagName[] = [
  'p-canvas',
  'p-pagination',
  'p-sheet',
  'p-switch',
  'p-tag-dismissible',
  'p-text-list',
  'p-toast',
];

/** The tabs of every component page, in order. */
const COMPONENT_TABS = {
  configurator: 'Configurator',
  examples: 'Examples',
  usage: 'Usage',
  accessibility: 'Accessibility',
  api: 'API',
} as const;

const ACRONYMS = ['ai', 'url'];

/** `link-tile` → `Link Tile`, `input-url` → `Input URL` */
const getComponentName = (component: string): string =>
  component
    .split('-')
    .map((word) => (ACRONYMS.includes(word) ? word.toUpperCase() : capitalCase(word)))
    .join(' ');

type Slug<T> = T extends `p-${infer S}` ? S : never;

/**
 * Every component with a page of its own, deprecated ones last. Children like `p-optgroup` are documented on their
 * parent's page. Typed with every chunked component and every tab, so `DocsRoute` knows their routes.
 */
const getComponentPages = () =>
  Object.fromEntries(
    Object.entries(componentMeta)
      .filter(([, meta]) => meta.isChunked && !meta.requiredParent)
      .sort(([, a], [, b]) => Number(!!a.isDeprecated) - Number(!!b.isDeprecated))
      .map(([key]) => {
        const tagName = key as TagName;
        const component = key.replace(/^p-/, '');
        const tabs = Object.fromEntries(
          Object.entries(COMPONENT_TABS)
            .filter(([tab]) => tab !== 'examples' || !COMPONENTS_WITHOUT_EXAMPLES.includes(tagName))
            .map(([tab, name]) => [tab, { name }])
        );
        return [component, { name: getComponentName(component), tagName, tabs }];
      })
  ) as Record<
    Slug<TagNameWithChunk>,
    { name: string; tagName: TagName; tabs: Partial<Record<keyof typeof COMPONENT_TABS, Tab>> }
  >;

export const sitemap = {
  news: {
    name: 'News',
    pages: {
      'migration-guide': {
        name: 'Migration Guide',
        tabs: {
          'porsche-design-system': { name: 'Porsche Design System' },
          tailwindcss: { name: 'Tailwind CSS' },
          scss: { name: 'SCSS' },
          emotion: { name: 'Emotion' },
          'vanilla-extract': { name: 'Vanilla Extract' },
        },
      },
      changelog: { name: 'Changelog' },
      roadmap: { name: 'Roadmap' },
    },
  },
  designing: {
    name: 'Designing',
    pages: {
      introduction: { name: 'Introduction' },
    },
  },
  developing: {
    name: 'Developing',
    pages: {
      introduction: { name: 'Introduction' },
      angular: {
        name: 'Angular',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          form: { name: 'Form' },
          testing: { name: 'Testing' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      astro: {
        name: 'Astro',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          faq: { name: 'FAQ' },
        },
      },
      'next-js': {
        name: 'Next.js',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          form: { name: 'Form' },
          demo: { name: 'Demo' },
          testing: { name: 'Testing' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      react: {
        name: 'React',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          form: { name: 'Form' },
          testing: { name: 'Testing' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      'react-router': {
        name: 'React Router',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          form: { name: 'Form' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      remix: { name: 'Remix' },
      'vanilla-js': {
        name: 'Vanilla JS',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          form: { name: 'Form' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      vue: {
        name: 'Vue',
        tabs: {
          'getting-started': { name: 'Getting Started' },
          demo: { name: 'Demo' },
          form: { name: 'Form' },
          testing: { name: 'Testing' },
          advanced: { name: 'Advanced' },
          faq: { name: 'FAQ' },
        },
      },
      'components-ready': { name: 'Components Ready' },
    },
  },
  skills: {
    name: 'Skills',
    pages: {
      introduction: {
        name: 'Introduction',
        tabs: {
          general: { name: 'General' },
          installation: { name: 'Installation' },
        },
      },
      knowledge: { name: 'Knowledge' },
      'audit-deprecations': { name: 'Audit Deprecations' },
    },
  },
  components: {
    name: 'Components',
    pages: {
      introduction: { name: 'Introduction' },
      ...getComponentPages(),
    },
  },
  stylesheets: {
    name: 'Stylesheets',
    pages: {
      introduction: { name: 'Introduction' },
      'css-variables': {
        name: 'CSS Variables',
        tabs: {
          introduction: { name: 'Introduction' },
          api: { name: 'API' },
        },
      },
      'color-scheme': {
        name: 'Color Scheme',
        tabs: {
          introduction: { name: 'Introduction' },
          api: { name: 'API' },
        },
      },
      'font-face': { name: 'Font Face' },
      normalize: { name: 'Normalize' },
      initial: { name: 'Initial' },
    },
  },
  partials: {
    name: 'Partials',
    pages: {
      introduction: { name: 'Introduction' },
      'component-chunk-links': { name: 'Component Chunk Links' },
      'font-links': { name: 'Font Links' },
      'icon-links': { name: 'Icon Links' },
      'loader-script': { name: 'Loader Script' },
      'meta-tags-and-icon-links': { name: 'Meta Tags And Icon Links' },
    },
  },
  patterns: {
    name: 'Patterns',
    pages: {
      header: { name: 'Header' },
      footer: { name: 'Footer' },
      popover: { name: 'Popover' },
      feedback: { name: 'Feedback' },
      forms: {
        name: 'Forms',
        tabs: {
          guidelines: { name: 'Guidelines' },
          resources: { name: 'Resources' },
          legal: { name: 'Legal' },
        },
      },
      notifications: {
        name: 'Notifications',
        tabs: {
          introduction: { name: 'Introduction' },
          'decision-tree': { name: 'Decision Tree' },
        },
      },
    },
  },
  templates: {
    name: 'Templates',
    pages: {
      'landing-page': { name: 'Landing Page' },
      'admin-panel': { name: 'Admin Panel' },
    },
  },
  tokens: {
    name: 'Tokens',
    pages: {
      introduction: { name: 'Introduction' },
      blur: { name: 'Blur' },
      border: { name: 'Border' },
      breakpoint: { name: 'Breakpoint' },
      color: { name: 'Color' },
      font: { name: 'Font' },
      gradient: { name: 'Gradient' },
      motion: { name: 'Motion' },
      shadow: { name: 'Shadow' },
      spacing: { name: 'Spacing' },
    },
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    pages: {
      introduction: { name: 'Introduction' },
      blur: {
        name: 'Blur',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      border: {
        name: 'Border',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      color: {
        name: 'Color',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      focus: {
        name: 'Focus',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
        },
      },
      gradient: {
        name: 'Gradient',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      grid: {
        name: 'Grid',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      'media-query': {
        name: 'Media Query',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      motion: {
        name: 'Motion',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      shadow: {
        name: 'Shadow',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      skeleton: {
        name: 'Skeleton',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      spacing: {
        name: 'Spacing',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      typography: {
        name: 'Typography',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
    },
  },
  scss: {
    name: 'SCSS',
    pages: {
      introduction: { name: 'Introduction' },
      blur: {
        name: 'Blur',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      border: {
        name: 'Border',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      color: {
        name: 'Color',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      focus: {
        name: 'Focus',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      gradient: {
        name: 'Gradient',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      grid: {
        name: 'Grid',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      'media-query': {
        name: 'Media Query',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      motion: {
        name: 'Motion',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      shadow: {
        name: 'Shadow',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      skeleton: {
        name: 'Skeleton',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      spacing: {
        name: 'Spacing',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      typography: {
        name: 'Typography',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
    },
  },
  emotion: {
    name: 'Emotion',
    pages: {
      introduction: { name: 'Introduction' },
      blur: {
        name: 'Blur',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      border: {
        name: 'Border',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      color: {
        name: 'Color',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      focus: {
        name: 'Focus',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      gradient: {
        name: 'Gradient',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      grid: {
        name: 'Grid',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      'media-query': {
        name: 'Media Query',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      motion: {
        name: 'Motion',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      shadow: {
        name: 'Shadow',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      skeleton: {
        name: 'Skeleton',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      spacing: {
        name: 'Spacing',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      typography: {
        name: 'Typography',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
    },
  },
  'vanilla-extract': {
    name: 'Vanilla Extract',
    pages: {
      introduction: { name: 'Introduction' },
      blur: {
        name: 'Blur',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      border: {
        name: 'Border',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      color: {
        name: 'Color',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      focus: {
        name: 'Focus',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      gradient: {
        name: 'Gradient',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      grid: {
        name: 'Grid',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      'media-query': {
        name: 'Media Query',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      motion: {
        name: 'Motion',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      shadow: {
        name: 'Shadow',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      skeleton: {
        name: 'Skeleton',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      spacing: {
        name: 'Spacing',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
      typography: {
        name: 'Typography',
        tabs: {
          examples: { name: 'Examples' },
          usage: { name: 'Usage' },
          api: { name: 'API' },
        },
      },
    },
  },
  'ag-grid': {
    name: 'AG Grid',
    pages: {
      theme: { name: 'Theme' },
    },
  },
  'must-know': {
    name: 'Must Know',
    pages: {
      initialization: {
        name: 'Initialization',
        tabs: {
          introduction: { name: 'Introduction' },
          'vanilla-js': { name: 'Vanilla JS' },
          angular: { name: 'Angular' },
          react: { name: 'React' },
          vue: { name: 'Vue' },
          'next-js': { name: 'Next JS' },
          remix: { name: 'Remix' },
        },
      },
      theme: { name: 'Theme' },
      typography: { name: 'Typography' },
      performance: {
        name: 'Performance',
        tabs: {
          cdn: { name: 'CDN' },
          'loading-behaviour': { name: 'Loading Behaviour' },
        },
      },
      accessibility: {
        name: 'Accessibility',
        tabs: {
          introduction: { name: 'Introduction' },
          'dos-and-donts': { name: "Do's and Don'ts" },
          'ai-agent-setup': { name: 'Setting AI Agent Context' },
          statement: { name: 'Statement' },
        },
      },
      security: {
        name: 'Security',
        tabs: {
          vulnerabilities: { name: 'Vulnerabilities' },
          'content-security-policy': { name: 'Content Security Policy' },
        },
      },
      'browser-compatibility': { name: 'Browser Compatibility' },
      versioning: { name: 'Versioning' },
      'definition-of-done': { name: 'Definition of Done' },
    },
  },
  help: {
    name: 'Help',
    pages: {
      support: { name: 'Support' },
      faq: { name: 'FAQ' },
      'feature-request': { name: 'Feature Request' },
      'bug-report': { name: 'Bug Report' },
      contribution: { name: 'Contribution' },
    },
  },
} satisfies Record<string, Category>;

/** `getPath('news', 'changelog')` → `/news/changelog` */
export const getPath = (category: string, page?: string, tab?: string): string =>
  `/${[category, page, tab].filter(Boolean).join('/')}`;

/**
 * Where a category or a page leads: its first page and that page's first tab. `/news` and `/news/migration-guide` lead
 * to `/news/migration-guide/porsche-design-system`.
 */
export const getLandingPath = (category: string, page?: string): string => {
  const { pages } = (sitemap as Record<string, Category>)[category];
  const pageKey = page ?? Object.keys(pages)[0];
  return getPath(category, pageKey, Object.keys(pages[pageKey].tabs ?? {})[0]);
};

/** Pages that are deliberately not part of the navigation but can be linked. */
export const ROUTES_WITHOUT_SITEMAP_ENTRY = ['/', '/accessibility-statement', '/license'] as const;

type Sitemap = typeof sitemap;

type PageRoute<C extends keyof Sitemap, P extends keyof Sitemap[C]['pages'] & string> =
  | `/${C}/${P}`
  | (Sitemap[C]['pages'][P] extends { tabs: infer T } ? `/${C}/${P}/${keyof T & string}` : never);

type CategoryRoute<C extends keyof Sitemap & string> =
  | `/${C}`
  | { [P in keyof Sitemap[C]['pages'] & string]: PageRoute<C, P> }[keyof Sitemap[C]['pages'] & string];

/** A route of the Storefront, without a trailing slash: `/components/button/usage`. */
export type DocsRoute =
  | { [C in keyof Sitemap & string]: CategoryRoute<C> }[keyof Sitemap & string]
  | (typeof ROUTES_WITHOUT_SITEMAP_ENTRY)[number];
