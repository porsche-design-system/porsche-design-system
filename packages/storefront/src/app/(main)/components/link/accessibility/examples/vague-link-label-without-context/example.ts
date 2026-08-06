import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueLinkLabelWithoutContextA11yExample = {
  name: 'Vague link label without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link',
          properties: { href: 'https://porsche.com' },
          children: ['Show'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link',
          properties: { href: 'https://porsche.com', aria: { 'aria-label': 'Show details of product XYZ' } },
          children: ['Show details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
