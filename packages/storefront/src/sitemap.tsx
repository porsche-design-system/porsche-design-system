import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import type { ReactNode } from 'react';
import React from 'react';
import { getFlags } from '@/utils/getFlags';

export const COMPONENT_ROUTES_META = Object.entries(componentMeta).filter(
  ([_, value]) => value.isChunked && !value.requiredParent
);

export const COMPONENT_ROUTES = COMPONENT_ROUTES_META.map(([key]) => ({ component: key.replace('p-', '') }));

const getComponents = (): Routes => {
  // TODO: Maybe we could automatically generate this depending what routes/folders exist?
  const COMPONENTS_WITHOUT_EXAMPLES: TagName[] = [
    'p-canvas',
    'p-pagination',
    'p-flag',
    'p-switch',
    'p-sheet',
    'p-tag-dismissible',
    'p-text-list',
    'p-toast',
  ];

  return COMPONENT_ROUTES_META.sort(([, aMeta], [, bMeta]) => {
    // Sort by isDeprecated
    const aIsDeprecated = aMeta.isDeprecated ? 1 : 0;
    const bIsDeprecated = bMeta.isDeprecated ? 1 : 0;
    return aIsDeprecated - bIsDeprecated;
  }).reduce((acc, [key, meta]) => {
    const linkName = (
      <>
        {transformComponentName(key)} {getFlags(meta)}
      </>
    ); // Transforms p-link-tile => Link Tile & Adds flags 🚫, 🛠, 🧪
    const component = key.replace('p-', ''); // Removes the "p-" prefix => link-tile
    acc[component] = {
      name: linkName,
      path: `/components/${component}`,
      type: 'PAGE',
      subPaths: {
        configurator: {
          name: 'Configurator',
          path: `/components/${component}/configurator`,
          type: 'TAB',
        },
        ...(!COMPONENTS_WITHOUT_EXAMPLES.includes(key as TagName) && {
          examples: {
            name: 'Examples',
            path: `/components/${component}/examples`,
            type: 'TAB',
          },
        }),
        usage: {
          name: 'Usage',
          path: `/components/${component}/usage`,
          type: 'TAB',
        },
        ...(key === 'p-icon' && {
          guideline: {
            name: 'Guideline',
            path: `/components/${component}/guideline`,
            type: 'TAB',
          },
        }),
        accessibility: {
          name: 'Accessibility',
          path: `/components/${component}/accessibility`,
          type: 'TAB',
        },
        api: {
          name: 'API',
          path: `/components/${component}/api`,
          type: 'TAB',
        },
      },
    };
    return acc;
  }, {} as Routes);
};

const transformComponentName = (name: string): string => {
  return name
    .replace(/^p-/, '') // Remove the "p-" prefix
    .split('-') // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join words with a space
};

export type Route = {
  name: string | ReactNode;
  path: string;
  type: 'CATEGORY' | 'PAGE' | 'TAB';
  subPaths?: Routes;
};

export type Routes = {
  [path: string]: Route;
};

export const sitemap: Routes = {
  news: {
    name: 'News',
    path: '/news',
    type: 'CATEGORY',
    subPaths: {
      'migration-guide': {
        name: 'Migration Guide',
        path: '/news/migration-guide',
        type: 'PAGE',
        subPaths: {
          'porsche-design-system': {
            name: 'Porsche Design System',
            path: '/news/migration-guide/porsche-design-system',
            type: 'TAB',
          },
          'scss': {
            name: 'SCSS',
            path: '/news/migration-guide/scss',
            type: 'TAB',
          },
          'emotion': {
            name: 'Emotion',
            path: '/news/migration-guide/emotion',
            type: 'TAB',
          },
          'vanilla-extract': {
            name: 'Vanilla Extract',
            path: '/news/migration-guide/vanilla-extract',
            type: 'TAB',
          },
        },
      },
      changelog: {
        name: 'Changelog',
        path: '/news/changelog',
        type: 'PAGE',
      },
      roadmap: {
        name: 'Roadmap',
        path: '/news/roadmap',
        type: 'PAGE',
      },
    },
  },
  designing: {
    name: 'Designing',
    path: '/designing',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/designing/introduction',
        type: 'PAGE',
      },
    },
  },
  developing: {
    name: 'Developing',
    path: '/developing',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/developing/introduction',
        type: 'PAGE',
      },
      angular: {
        name: 'Angular',
        path: '/developing/angular',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/angular/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/angular/demo',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/angular/form',
            type: 'TAB',
          },
          testing: {
            name: 'Testing',
            path: '/developing/angular/testing',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/angular/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/angular/faq',
            type: 'TAB',
          },
        },
      },
      astro: {
        name: 'Astro',
        path: '/developing/astro',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/astro/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/astro/demo',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/astro/faq',
            type: 'TAB',
          },
        },
      },
      'next-js': {
        name: 'Next.js',
        path: '/developing/next-js',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/next-js/getting-started',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/next-js/form',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/next-js/demo',
            type: 'TAB',
          },
          testing: {
            name: 'Testing',
            path: '/developing/next-js/testing',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/next-js/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/next-js/faq',
            type: 'TAB',
          },
        },
      },
      react: {
        name: 'React',
        path: '/developing/react',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/react/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/react/demo',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/react/form',
            type: 'TAB',
          },
          testing: {
            name: 'Testing',
            path: '/developing/react/testing',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/react/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/react/faq',
            type: 'TAB',
          },
        },
      },
      'react-router': {
        name: 'React Router',
        path: '/developing/react-router',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/react-router/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/react-router/demo',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/react-router/form',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/react-router/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/react-router/faq',
            type: 'TAB',
          },
        },
      },
      remix: {
        name: 'Remix',
        path: '/developing/remix',
        type: 'PAGE',
      },
      'vanilla-js': {
        name: 'Vanilla JS',
        path: '/developing/vanilla-js',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/vanilla-js/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/vanilla-js/demo',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/vanilla-js/form',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/vanilla-js/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/vanilla-js/faq',
            type: 'TAB',
          },
        },
      },
      vue: {
        name: 'Vue',
        path: '/developing/vue',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/vue/getting-started',
            type: 'TAB',
          },
          demo: {
            name: 'Demo',
            path: '/developing/vue/demo',
            type: 'TAB',
          },
          form: {
            name: 'Form',
            path: '/developing/vue/form',
            type: 'TAB',
          },
          advanced: {
            name: 'Advanced',
            path: '/developing/vue/advanced',
            type: 'TAB',
          },
          faq: {
            name: 'FAQ',
            path: '/developing/vue/faq',
            type: 'TAB',
          },
        },
      },
      'components-ready': {
        name: 'Components Ready',
        path: '/developing/components-ready',
        type: 'PAGE',
      },
    },
  },
  components: {
    name: 'Components',
    path: '/components',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/components/introduction',
        type: 'PAGE',
      },
      ...getComponents(),
    }, // Assuming this is dynamically fetched or implemented elsewhere.
  },
  styles: {
    name: 'Styles',
    path: '/styles',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/styles/introduction',
        type: 'PAGE',
      },
      color: {
        name: 'Color',
        path: '/styles/color',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/styles/color/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/styles/color/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/styles/color/api',
            type: 'TAB',
          },
        },
      },
      'font-face': {
        name: 'Font Face',
        path: '/styles/font-face',
        type: 'PAGE',
      },
      normalize: {
        name: 'Normalize',
        path: '/styles/normalize',
        type: 'PAGE',
      },
    },
  },
  partials: {
    name: 'Partials',
    path: '/partials',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/partials/introduction',
        type: 'PAGE',
      },
      'component-chunk-links': {
        name: 'Component Chunk Links',
        path: '/partials/component-chunk-links',
        type: 'PAGE',
      },
      'font-links': {
        name: 'Font Links',
        path: '/partials/font-links',
        type: 'PAGE',
      },
      'icon-links': {
        name: 'Icon Links',
        path: '/partials/icon-links',
        type: 'PAGE',
      },
      'loader-script': {
        name: 'Loader Script',
        path: '/partials/loader-script',
        type: 'PAGE',
      },
      'meta-tags-and-icon-links': {
        name: 'Meta Tags And Icon Links',
        path: '/partials/meta-tags-and-icon-links',
        type: 'PAGE',
      },
    },
  },
  patterns: {
    name: 'Patterns',
    path: '/patterns',
    type: 'CATEGORY',
    subPaths: {
      header: {
        name: 'Header',
        path: '/patterns/header',
        type: 'PAGE',
      },
      footer: {
        name: 'Footer',
        path: '/patterns/footer',
        type: 'PAGE',
      },
      forms: {
        name: 'Forms',
        path: '/patterns/forms',
        type: 'PAGE',
        subPaths: {
          guidelines: {
            name: 'Guidelines',
            path: '/patterns/forms/guidelines',
            type: 'PAGE',
          },
          resources: {
            name: 'Resources',
            path: '/patterns/forms/resources',
            type: 'PAGE',
          },
          legal: {
            name: 'Legal',
            path: '/patterns/forms/legal',
            type: 'PAGE',
          },
        },
      },
      notifications: {
        name: 'Notifications',
        path: '/patterns/notifications',
        type: 'PAGE',
        subPaths: {
          introduction: {
            name: 'Introduction',
            path: '/patterns/notifications/introduction',
            type: 'PAGE',
          },
          'decision-tree': {
            name: 'Decision Tree',
            path: '/patterns/notifications/decision-tree',
            type: 'PAGE',
          },
        },
      },
      'ai-tag': {
        name: 'AI Tag',
        path: '/patterns/ai-tag',
        type: 'PAGE',
      },
    },
  },
  templates: {
    name: 'Templates',
    path: '/templates',
    type: 'CATEGORY',
    subPaths: {
      'landing-page': {
        name: 'Landing Page',
        path: '/templates/landing-page',
        type: 'PAGE',
      },
    },
  },
  tokens: {
    name: 'Tokens',
    path: '/tokens',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/tokens/introduction',
        type: 'PAGE',
      },
      blur: {
        name: 'Blur',
        path: '/tokens/blur',
        type: 'PAGE',
      },
      border: {
        name: 'Border',
        path: '/tokens/border',
        type: 'PAGE',
      },
      breakpoint: {
        name: 'Breakpoint',
        path: '/tokens/breakpoint',
        type: 'PAGE',
      },
      color: {
        name: 'Color',
        path: '/tokens/color',
        type: 'PAGE',
      },
      font: {
        name: 'Font',
        path: '/tokens/font',
        type: 'PAGE',
      },
      gradient: {
        name: 'Gradient',
        path: '/tokens/gradient',
        type: 'PAGE',
      },
      motion: {
        name: 'Motion',
        path: '/tokens/motion',
        type: 'PAGE',
      },
      shadow: {
        name: 'Shadow',
        path: '/tokens/shadow',
        type: 'PAGE',
      },
      spacing: {
        name: 'Spacing',
        path: '/tokens/spacing',
        type: 'PAGE',
      },
    },
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    path: '/tailwindcss',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/tailwindcss/introduction',
        type: 'PAGE',
      },
      blur: {
        name: 'Blur',
        path: '/tailwindcss/blur',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/blur/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/blur/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/blur/api',
            type: 'TAB',
          },
        },
      },
      border: {
        name: 'Border',
        path: '/tailwindcss/border',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/border/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/border/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/border/api',
            type: 'TAB',
          },
        },
      },
      color: {
        name: 'Color',
        path: '/tailwindcss/color',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/color/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/color/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/color/api',
            type: 'TAB',
          },
        },
      },
      focus: {
        name: 'Focus',
        path: '/tailwindcss/focus',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/focus/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/focus/usage',
            type: 'TAB',
          },
        },
      },
      gradient: {
        name: 'Gradient',
        path: '/tailwindcss/gradient',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/gradient/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/gradient/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/gradient/api',
            type: 'TAB',
          },
        },
      },
      grid: {
        name: 'Grid',
        path: '/tailwindcss/grid',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/grid/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/grid/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/grid/api',
            type: 'TAB',
          },
        },
      },
      'media-query': {
        name: 'Media Query',
        path: '/tailwindcss/media-query',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/media-query/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/media-query/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/media-query/api',
            type: 'TAB',
          },
        },
      },
      motion: {
        name: 'Motion',
        path: '/tailwindcss/motion',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/motion/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/motion/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/motion/api',
            type: 'TAB',
          },
        },
      },
      shadow: {
        name: 'Shadow',
        path: '/tailwindcss/shadow',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/shadow/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/shadow/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/shadow/api',
            type: 'TAB',
          },
        },
      },
      skeleton: {
        name: 'Skeleton',
        path: '/tailwindcss/skeleton',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/skeleton/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/skeleton/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/skeleton/api',
            type: 'TAB',
          },
        },
      },
      spacing: {
        name: 'Spacing',
        path: '/tailwindcss/spacing',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/spacing/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/spacing/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/spacing/api',
            type: 'TAB',
          },
        },
      },
      typography: {
        name: 'Typography',
        path: '/tailwindcss/typography',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/tailwindcss/typography/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/tailwindcss/typography/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/tailwindcss/typography/api',
            type: 'TAB',
          },
        },
      },
    },
  },
  scss: {
    name: 'SCSS',
    path: '/scss',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/scss/introduction',
        type: 'PAGE',
      },
      blur: {
        name: 'Blur',
        path: '/scss/blur',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/blur/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/blur/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/blur/api',
            type: 'TAB',
          },
        },
      },
      border: {
        name: 'Border',
        path: '/scss/border',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/border/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/border/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/border/api',
            type: 'TAB',
          },
        },
      },
      color: {
        name: 'Color',
        path: '/scss/color',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/color/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/color/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/color/api',
            type: 'TAB',
          },
        },
      },
      focus: {
        name: 'Focus',
        path: '/scss/focus',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/focus/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/focus/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/focus/api',
            type: 'TAB',
          },
        },
      },
      gradient: {
        name: 'Gradient',
        path: '/scss/gradient',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/gradient/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/gradient/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/gradient/api',
            type: 'TAB',
          },
        },
      },
      grid: {
        name: 'Grid',
        path: '/scss/grid',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/grid/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/grid/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/grid/api',
            type: 'TAB',
          },
        },
      },
      'media-query': {
        name: 'Media Query',
        path: '/scss/media-query',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/media-query/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/media-query/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/media-query/api',
            type: 'TAB',
          },
        },
      },
      motion: {
        name: 'Motion',
        path: '/scss/motion',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/motion/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/motion/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/motion/api',
            type: 'TAB',
          },
        },
      },
      shadow: {
        name: 'Shadow',
        path: '/scss/shadow',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/shadow/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/shadow/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/shadow/api',
            type: 'TAB',
          },
        },
      },
      skeleton: {
        name: 'Skeleton',
        path: '/scss/skeleton',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/skeleton/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/skeleton/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/skeleton/api',
            type: 'TAB',
          },
        },
      },
      spacing: {
        name: 'Spacing',
        path: '/scss/spacing',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/spacing/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/spacing/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/spacing/api',
            type: 'TAB',
          },
        },
      },
      typography: {
        name: 'Typography',
        path: '/scss/typography',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/scss/typography/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/scss/typography/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/scss/typography/api',
            type: 'TAB',
          },
        },
      },
    },
  },
  emotion: {
    name: 'Emotion',
    path: '/emotion',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/emotion/introduction',
        type: 'PAGE',
      },
      blur: {
        name: 'Blur',
        path: '/emotion/blur',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/blur/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/blur/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/blur/api',
            type: 'TAB',
          },
        },
      },
      border: {
        name: 'Border',
        path: '/emotion/border',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/border/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/border/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/border/api',
            type: 'TAB',
          },
        },
      },
      color: {
        name: 'Color',
        path: '/emotion/color',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/color/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/color/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/color/api',
            type: 'TAB',
          },
        },
      },
      focus: {
        name: 'Focus',
        path: '/emotion/focus',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/focus/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/focus/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/focus/api',
            type: 'TAB',
          },
        },
      },
      gradient: {
        name: 'Gradient',
        path: '/emotion/gradient',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/gradient/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/gradient/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/gradient/api',
            type: 'TAB',
          },
        },
      },
      grid: {
        name: 'Grid',
        path: '/emotion/grid',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/grid/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/grid/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/grid/api',
            type: 'TAB',
          },
        },
      },
      'media-query': {
        name: 'Media Query',
        path: '/emotion/media-query',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/media-query/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/media-query/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/media-query/api',
            type: 'TAB',
          },
        },
      },
      motion: {
        name: 'Motion',
        path: '/emotion/motion',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/motion/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/motion/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/motion/api',
            type: 'TAB',
          },
        },
      },
      shadow: {
        name: 'Shadow',
        path: '/emotion/shadow',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/shadow/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/shadow/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/shadow/api',
            type: 'TAB',
          },
        },
      },
      skeleton: {
        name: 'Skeleton',
        path: '/emotion/skeleton',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/skeleton/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/skeleton/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/skeleton/api',
            type: 'TAB',
          },
        },
      },
      spacing: {
        name: 'Spacing',
        path: '/emotion/spacing',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/spacing/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/spacing/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/spacing/api',
            type: 'TAB',
          },
        },
      },
      typography: {
        name: 'Typography',
        path: '/emotion/typography',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/emotion/typography/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/emotion/typography/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/emotion/typography/api',
            type: 'TAB',
          },
        },
      },
    },
  },
  'vanilla-extract': {
    name: 'Vanilla Extract',
    path: '/vanilla-extract',
    type: 'CATEGORY',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/vanilla-extract/introduction',
        type: 'PAGE',
      },
      blur: {
        name: 'Blur',
        path: '/vanilla-extract/blur',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/blur/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/blur/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/blur/api',
            type: 'TAB',
          },
        },
      },
      border: {
        name: 'Border',
        path: '/vanilla-extract/border',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/border/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/border/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/border/api',
            type: 'TAB',
          },
        },
      },
      color: {
        name: 'Color',
        path: '/vanilla-extract/color',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/color/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/color/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/color/api',
            type: 'TAB',
          },
        },
      },
      focus: {
        name: 'Focus',
        path: '/vanilla-extract/focus',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/focus/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/focus/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/focus/api',
            type: 'TAB',
          },
        },
      },
      gradient: {
        name: 'Gradient',
        path: '/vanilla-extract/gradient',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/gradient/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/gradient/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/gradient/api',
            type: 'TAB',
          },
        },
      },
      grid: {
        name: 'Grid',
        path: '/vanilla-extract/grid',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/grid/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/grid/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/grid/api',
            type: 'TAB',
          },
        },
      },
      'media-query': {
        name: 'Media Query',
        path: '/vanilla-extract/media-query',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/media-query/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/media-query/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/media-query/api',
            type: 'TAB',
          },
        },
      },
      motion: {
        name: 'Motion',
        path: '/vanilla-extract/motion',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/motion/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/motion/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/motion/api',
            type: 'TAB',
          },
        },
      },
      shadow: {
        name: 'Shadow',
        path: '/vanilla-extract/shadow',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/shadow/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/shadow/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/shadow/api',
            type: 'TAB',
          },
        },
      },
      skeleton: {
        name: 'Skeleton',
        path: '/vanilla-extract/skeleton',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/skeleton/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/skeleton/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/skeleton/api',
            type: 'TAB',
          },
        },
      },
      spacing: {
        name: 'Spacing',
        path: '/vanilla-extract/spacing',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/spacing/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/spacing/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/spacing/api',
            type: 'TAB',
          },
        },
      },
      typography: {
        name: 'Typography',
        path: '/vanilla-extract/typography',
        type: 'PAGE',
        subPaths: {
          examples: {
            name: 'Examples',
            path: '/vanilla-extract/typography/examples',
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: '/vanilla-extract/typography/usage',
            type: 'TAB',
          },
          api: {
            name: 'API',
            path: '/vanilla-extract/typography/api',
            type: 'TAB',
          },
        },
      },
    },
  },
  'ag-grid': {
    name: 'AG Grid',
    path: '/ag-grid',
    type: 'CATEGORY',
    subPaths: {
      theme: {
        name: 'Theme',
        path: '/ag-grid/theme',
        type: 'PAGE',
      },
    },
  },
  'must-know': {
    name: 'Must Know',
    path: '/must-know',
    type: 'CATEGORY',
    subPaths: {
      initialization: {
        name: 'Initialization',
        path: '/must-know/initialization',
        type: 'PAGE',
        subPaths: {
          introduction: {
            name: 'Introduction',
            path: '/must-know/initialization/introduction',
            type: 'PAGE',
          },
          'vanilla-js': {
            name: 'Vanilla JS',
            path: '/must-know/initialization/vanilla-js',
            type: 'PAGE',
          },
          angular: {
            name: 'Angular',
            path: '/must-know/initialization/angular',
            type: 'PAGE',
          },
          react: {
            name: 'React',
            path: '/must-know/initialization/react',
            type: 'PAGE',
          },
          vue: {
            name: 'Vue',
            path: '/must-know/initialization/vue',
            type: 'PAGE',
          },
          'next-js': {
            name: 'Next JS',
            path: '/must-know/initialization/next-js',
            type: 'PAGE',
          },
          remix: {
            name: 'Remix',
            path: '/must-know/initialization/remix',
            type: 'PAGE',
          },
        },
      },
      performance: {
        name: 'Performance',
        path: '/must-know/performance',
        type: 'PAGE',
        subPaths: {
          cdn: {
            name: 'CDN',
            path: '/must-know/performance/cdn',
            type: 'PAGE',
          },
          'loading-behaviour': {
            name: 'Loading Behaviour',
            path: '/must-know/performance/loading-behaviour',
            type: 'PAGE',
          },
        },
      },
      accessibility: {
        name: 'Accessibility',
        path: '/must-know/accessibility',
        type: 'PAGE',
        subPaths: {
          introduction: {
            name: 'Introduction',
            path: '/must-know/accessibility/introduction',
            type: 'PAGE',
          },
          statement: {
            name: 'Statement',
            path: '/must-know/accessibility/statement',
            type: 'PAGE',
          },
        },
      },
      security: {
        name: 'Security',
        path: '/must-know/security',
        type: 'PAGE',
        subPaths: {
          vulnerabilities: {
            name: 'Vulnerabilities',
            path: '/must-know/security/vulnerabilities',
            type: 'PAGE',
          },
          'content-security-policy': {
            name: 'Content Security Policy',
            path: '/must-know/security/content-security-policy',
            type: 'PAGE',
          },
        },
      },
      'browser-compatibility': {
        name: 'Browser Compatibility',
        path: '/must-know/browser-compatibility',
        type: 'PAGE',
      },
      versioning: {
        name: 'Versioning',
        path: '/must-know/versioning',
        type: 'PAGE',
      },
      'definition-of-done': {
        name: 'Definition of Done',
        path: '/must-know/definition-of-done',
        type: 'PAGE',
      },
    },
  },
  help: {
    name: 'Help',
    path: '/help',
    type: 'CATEGORY',
    subPaths: {
      support: {
        name: 'Support',
        path: '/help/support',
        type: 'PAGE',
      },
      faq: {
        name: 'FAQ',
        path: '/help/faq',
        type: 'PAGE',
      },
      'feature-request': {
        name: 'Feature Request',
        path: '/help/feature-request',
        type: 'PAGE',
      },
      'bug-report': {
        name: 'Bug Report',
        path: '/help/bug-report',
        type: 'PAGE',
      },
      contribution: {
        name: 'Contribution',
        path: '/help/contribution',
        type: 'PAGE',
      },
    },
  },
};
