import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const vagueLinkLabelWithoutContextA11yExample = {
  name: 'Vague link label without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
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
          tag: 'p-link-pure',
          properties: { href: 'https://porsche.com', aria: { 'aria-label': 'Show details of product XYZ' } },
          children: ['Show details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
