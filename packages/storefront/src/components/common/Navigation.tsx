import type { StorefrontNavigation, StorefrontNavigationPage } from '@/models/navigation';
import { componentMeta } from '@porsche-design-system/component-meta/src';
import { type AccordionUpdateEventDetail, PAccordion, PLinkPure } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { useState } from 'react';

const getComponents = (): StorefrontNavigationPage => {
  return Object.entries(componentMeta)
    .filter(([_, value]) => !value.requiredParent)
    .reduce((acc, [key, _]) => {
      const linkName = transformComponentName(key);
      const componentName = key.replace('p-', '');
      acc[linkName] = {
        Examples: `/components/${componentName}/examples`,
        Usage: `/components/${componentName}/examples`,
        Props: `/components/${componentName}/examples`,
      };
      return acc;
    }, {} as StorefrontNavigationPage);
};

const transformComponentName = (name: string): string => {
  return name
    .replace(/^p-/, '') // Remove the "p-" prefix
    .split('-') // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join words with a space
};

export const navigation: StorefrontNavigation = {
  News: {
    'Migration Guide': {
      'Porsche Design System': '/news/migration-guide/porsche-design-system',
      Utilities: '/news/migration-guide/utilities',
    },
    Changelog: '/news/changelog',
    Roadmap: '/news/roadmap',
  },
  Designing: {
    Introduction: '/designing/introduction',
  },
  Developing: {
    Introduction: '/developing/introduction',
    'Vanilla Js': {
      'Getting Started': '/developing/vanilla-js/getting-started',
      Advanced: '/developing/vanilla-js/advanced',
    },
    Angular: {
      'Getting Started': '/developing/angular/getting-started',
      Testing: '/developing/angular/testing',
      Advanced: '/developing/angular/advanced',
    },
    React: {
      'Getting Started': '/developing/react/getting-started',
      Testing: '/developing/react/testing',
      Advanced: '/developing/react/advanced',
    },
    'Next Js': {
      'Getting Started': '/developing/next-js/getting-started',
      Testing: '/developing/next-js/testing',
    },
    Remix: {
      'Getting Started': '/developing/remix/getting-started',
    },
    Vue: {
      'Getting Started': '/developing/vue/getting-started',
      Advanced: '/developing/vue/advanced',
    },
    'Components Ready': '/developing/components-ready',
  },
  Components: {
    Introduction: '/components',
    ...getComponents(),
  },
  Styles: {
    Introduction: '/styles/introduction',
    Border: '/styles/border',
    'Drop Shadow': '/styles/drop-shadow',
    Focus: '/styles/focus',
    'Frosted Glass': '/styles/frosted-glass',
    Gradient: '/styles/gradient',
    Grid: '/styles/grid',
    Hover: '/styles/hover',
    'Media Query': '/styles/media-query',
    Motion: '/styles/motion',
    Skeleton: '/styles/skeleton',
    Spacing: '/styles/spacing',
    Theme: '/styles/theme',
    Typography: '/styles/typography',
  },
  Partials: {
    Introduction: '/partials/introduction',
    'Browser Support Fallback Script': '/partials/browser-support-fallback-script',
    'Component Chunk Links': '/partials/component-chunk-links',
    'Cookies Fallback Script': '/partials/cookies-fallback-script',
    'Dsr Ponyfill': '/partials/dsr-ponyfill',
    'Font Face Stylesheet': 'partials/font-face-stylesheet',
    'Font Face Styles': '/partials/font-face-styles',
    'Font Links': '/partials/font-links',
    'Icon Links': '/partials/icon-links',
    'Initial Styles': '/partials/initial-styles',
    'Loader Script': '/partials/loader-script',
    'Meta Tags And Icon Links': '/partials/meta-tags-and-icon-links',
  },
  Patterns: {
    Forms: {
      Guidelines: '/patterns/forms/guidelines',
      Resources: '/patterns/forms/resources',
      Legal: '/patterns/forms/legal',
    },
    Notifications: {
      Introduction: '/patterns/notifications/notifications.usage',
      'Decision Tree': '/patterns/notifications/decision-tree',
    },
  },
  'Ag Grid': {
    Theme: '/ag-grid/theme',
  },
  'Must Know': {
    Initialization: {
      Introduction: '/must-know/initialization/introduction',
      'Vanilla Js': '/must-know/initialization/vanilla-js',
      Angular: '/must-know/initialization/angular',
      React: '/must-know/initialization/react',
      Vue: '/must-know/initialization/vue',
      'Next Js': '/must-know/initialization/next-js',
      Remix: '/must-know/initialization/remix',
    },
    Performance: {
      Cdn: '/must-know/performance/cdn',
      'Loading Behaviour': '/must-know/performance/loading-behaviour',
    },
    Accessibility: {
      Introduction: '/must-know/accessibility/introduction',
      Statement: '/must-know/accessibility/statement',
    },
    Security: {
      Vulnerabilities: '/must-know/security/vulnerabilities',
      'Content Security Policy': '/must-know/security/content-security-policy',
    },
    'Browser Compatibility': '/must-know/browser-compatibility',
    Versioning: '/must-know/versioning',
    'Definition Of Done': '/must-know/definition-of-done',
  },
  Help: {
    Support: '/help/support',
    Faq: '/help/faq',
    'Feature Request': '/help/feature-request',
    'Bug Report': '/help/bug-report',
    Contribution: '/help/contribution',
  },
};

const initialAccordionState = Object.keys(navigation).reduce<Record<keyof StorefrontNavigation, boolean>>(
  (acc, section) => {
    acc[section] = false;
    return acc;
  },
  {}
);

export const Navigation = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(initialAccordionState);

  const handleAccordionUpdate = (section: string) => (e: CustomEvent<AccordionUpdateEventDetail>) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: e.detail.open,
    }));
  };

  return (
    <>
      {Object.entries(navigation).map(([section, links]) => (
        <PAccordion
          key={section}
          heading={section}
          headingTag="h3"
          compact={true}
          open={openSections[section]}
          onUpdate={handleAccordionUpdate(section)}
        >
          {Object.entries(links).map(([linkText, linkHref]) => {
            // If the page has no tabs use the page otherwise use the first tab
            const href = typeof linkHref === 'string' ? linkHref : Object.values(linkHref)[0];
            return (
              <PLinkPure key={href} icon="none" stretch={true}>
                <Link href={href}>{linkText}</Link>
              </PLinkPure>
            );
          })}
        </PAccordion>
      ))}
    </>
  );
};
