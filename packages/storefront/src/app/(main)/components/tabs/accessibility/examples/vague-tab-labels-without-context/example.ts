import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueTabLabelsWithoutContextA11yExample = {
  name: 'Vague tab labels without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tabs',
          properties: { aria: { 'aria-label': 'Product details' } },
          children: [
            {
              tag: 'p-tabs-item',
              properties: { label: 'Details' },
              children: ['...'],
            },
            {
              tag: 'p-tabs-item',
              properties: { label: 'More' },
              children: ['...'],
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
          tag: 'p-tabs',
          properties: { aria: { 'aria-label': 'Porsche 911 configuration details' } },
          children: [
            {
              tag: 'p-tabs-item',
              properties: { label: 'Overview' },
              children: ['...'],
            },
            {
              tag: 'p-tabs-item',
              properties: { label: 'Equipment and packages' },
              children: ['...'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
