import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const defaultEnglishLabelsOnALocalizedPageA11yExample = {
  name: 'Default English labels on a localized page',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'html',
          properties: { lang: 'de_DE' },
          children: [
            '...',
            {
              tag: 'p-pagination',
              properties: { totalItemsCount: 120, itemsPerPage: 10, activePage: 1 },
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
          tag: 'html',
          properties: { lang: 'de_DE' },
          children: [
            '...',
            {
              tag: 'p-pagination',
              properties: {
                totalItemsCount: 120,
                itemsPerPage: 10,
                activePage: 1,
                intl: { root: 'Seitennavigation', prev: 'Vorherige Seite', next: 'Nächste Seite', page: 'Seite' },
              },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
