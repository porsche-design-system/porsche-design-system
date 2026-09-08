import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const decorativeIconWithRedundantLabelA11yExample = {
  name: 'Decorative icon with redundant label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-icon',
          properties: { name: 'phone', aria: { 'aria-label': 'Phone' } },
        },
        {
          tag: 'p-text',
          children: ['+49 711 911 0'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-icon',
          properties: { ariaHidden: true, name: 'phone' },
        },
        {
          tag: 'p-text',
          children: ['+49 711 911 0'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
