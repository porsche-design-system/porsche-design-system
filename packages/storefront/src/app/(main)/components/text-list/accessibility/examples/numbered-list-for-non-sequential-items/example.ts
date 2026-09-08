import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const numberedListForNonSequentialItemsA11yExample = {
  name: 'Numbered list for non-sequential items',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-text-list',
          properties: { type: 'numbered' },
          children: [
            {
              tag: 'p-text-list-item',
              children: ['Sport Chrono Package'],
            },
            {
              tag: 'p-text-list-item',
              children: ['BOSE Surround Sound'],
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
          tag: 'p-text-list',
          properties: { type: 'unordered' },
          children: [
            {
              tag: 'p-text-list-item',
              children: ['Sport Chrono Package'],
            },
            {
              tag: 'p-text-list-item',
              children: ['BOSE Surround Sound'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
