import { getFlags } from '@/utils/getFlags';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ReactNode } from 'react';

const getComponents = (): Routes => {
  return Object.entries(componentMeta)
    .filter(([_, value]) => value.isChunked)
    .sort(([, aMeta], [, bMeta]) => {
      // Sort by isDeprecated
      const aIsDeprecated = aMeta.isDeprecated ? 1 : 0;
      const bIsDeprecated = bMeta.isDeprecated ? 1 : 0;
      return aIsDeprecated - bIsDeprecated;
    })
    .reduce((acc, [key, meta]) => {
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
          examples: {
            name: 'Examples',
            path: `/components/${component}/examples`,
            type: 'TAB',
          },
          usage: {
            name: 'Usage',
            path: `/components/${component}/usage`,
            type: 'TAB',
          },
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
  redirect?: string;
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
    redirect: '/news/changelog',
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
          utilities: {
            name: 'Utilities',
            path: '/news/migration-guide/utilities',
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
    redirect: '/designing/introduction',
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
    redirect: '/developing/introduction',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/developing/introduction',
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
          advanced: {
            name: 'Advanced',
            path: '/developing/vanilla-js/advanced',
            type: 'TAB',
          },
        },
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
        },
      },
      'next-js': {
        name: 'Next JS',
        path: '/developing/next-js',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/next-js/getting-started',
            type: 'TAB',
          },
          testing: {
            name: 'Testing',
            path: '/developing/next-js/testing',
            type: 'TAB',
          },
        },
      },
      remix: {
        name: 'Remix',
        path: '/developing/remix',
        type: 'PAGE',
        subPaths: {
          'getting-started': {
            name: 'Getting Started',
            path: '/developing/remix/getting-started',
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
          advanced: {
            name: 'Advanced',
            path: '/developing/vue/advanced',
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
    redirect: '/components/introduction',
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
    redirect: '/styles/introduction',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/styles/introduction',
        type: 'PAGE',
      },
      border: {
        name: 'Border',
        path: '/styles/border',
        type: 'PAGE',
      },
      'drop-shadow': {
        name: 'Drop Shadow',
        path: '/styles/drop-shadow',
        type: 'PAGE',
      },
      focus: {
        name: 'Focus',
        path: '/styles/focus',
        type: 'PAGE',
      },
      'frosted-glass': {
        name: 'Frosted Glass',
        path: '/styles/frosted-glass',
        type: 'PAGE',
      },
      gradient: {
        name: 'Gradient',
        path: '/styles/gradient',
        type: 'PAGE',
      },
      grid: {
        name: 'Grid',
        path: '/styles/grid',
        type: 'PAGE',
      },
      hover: {
        name: 'Hover',
        path: '/styles/hover',
        type: 'PAGE',
      },
      'media-query': {
        name: 'Media Query',
        path: '/styles/media-query',
        type: 'PAGE',
      },
      motion: {
        name: 'Motion',
        path: '/styles/motion',
        type: 'PAGE',
      },
      skeleton: {
        name: 'Skeleton',
        path: '/styles/skeleton',
        type: 'PAGE',
      },
      spacing: {
        name: 'Spacing',
        path: '/styles/spacing',
        type: 'PAGE',
      },
      theme: {
        name: 'Theme',
        path: '/styles/theme',
        type: 'PAGE',
      },
      typography: {
        name: 'Typography',
        path: '/styles/typography',
        type: 'PAGE',
      },
    },
  },
  partials: {
    name: 'Partials',
    path: '/partials',
    type: 'CATEGORY',
    redirect: '/partials/introduction',
    subPaths: {
      introduction: {
        name: 'Introduction',
        path: '/partials/introduction',
        type: 'PAGE',
      },
      'browser-support-fallback-script': {
        name: 'Browser Support Fallback Script',
        path: '/partials/browser-support-fallback-script',
        type: 'PAGE',
      },
      'component-chunk-links': {
        name: 'Component Chunk Links',
        path: '/partials/component-chunk-links',
        type: 'PAGE',
      },
      'cookies-fallback-script': {
        name: 'Cookies Fallback Script',
        path: '/partials/cookies-fallback-script',
        type: 'PAGE',
      },
      'dsr-ponyfill': {
        name: 'DSR Ponyfill',
        path: '/partials/dsr-ponyfill',
        type: 'PAGE',
      },
      'font-face-styles': {
        name: 'Font Face Styles',
        path: '/partials/font-face-styles',
        type: 'PAGE',
      },
      'font-face-stylesheet': {
        name: 'Font Face Stylesheet',
        path: '/partials/font-face-stylesheet',
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
      'initial-styles': {
        name: 'Initial Styles',
        path: '/partials/initial-styles',
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
    redirect: '/patterns/forms',
    subPaths: {
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
    },
  },
  'must-know': {
    name: 'Must Know',
    path: '/must-know',
    type: 'CATEGORY',
    redirect: '/must-know/initialization',
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
    redirect: '/help/support',
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
