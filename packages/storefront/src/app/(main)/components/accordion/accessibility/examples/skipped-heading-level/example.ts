import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const skippedHeadingLevelA11yExample = {
  name: 'Skipped heading level',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-heading',
          properties: { tag: 'h1' },
          children: ['Configure your Porsche'],
        },
        {
          tag: 'p-accordion',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'summary', tag: 'h4', size: 'sm' },
              children: ['Delivery options'],
            },
            '...',
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
          tag: 'p-heading',
          properties: { tag: 'h1' },
          children: ['Configure your Porsche'],
        },
        {
          tag: 'p-accordion',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'summary', tag: 'h2', size: 'sm' },
              children: ['Delivery options'],
            },
            '...',
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
