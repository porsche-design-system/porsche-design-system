import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const routeNavigationWithoutLandmarkLabelA11yExample = {
  name: 'Route navigation without landmark label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tabs-bar',
          children: [
            {
              tag: 'a',
              properties: { href: '/models/911' },
              children: ['911'],
            },
            {
              tag: 'a',
              properties: { href: '/models/taycan' },
              children: ['Taycan'],
            },
          ],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'nav',
          properties: { ariaLabel: 'Porsche model range' },
          children: [
            {
              tag: 'p-tabs-bar',
              children: [
                {
                  tag: 'a',
                  properties: { href: '/models/911', ariaCurrent: 'page' },
                  children: ['911'],
                },
                {
                  tag: 'a',
                  properties: { href: '/models/taycan' },
                  children: ['Taycan'],
                },
              ],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
