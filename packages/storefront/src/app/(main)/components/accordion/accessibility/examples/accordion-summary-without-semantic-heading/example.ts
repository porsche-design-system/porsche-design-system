import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const accordionSummaryWithoutSemanticHeadingA11yExample = {
  name: 'Accordion summary without semantic heading',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-accordion',
          children: [
            {
              tag: 'span',
              properties: { slot: 'summary' },
              children: ['Delivery options'],
            },
            {
              tag: 'p-text',
              children: ['Content about delivery.'],
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
          tag: 'p-accordion',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'summary', tag: 'h2', size: 'sm' },
              children: ['Delivery options'],
            },
            {
              tag: 'p-text',
              children: ['Content about delivery.'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
