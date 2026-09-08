import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const linkedWordmarkWithoutAccessibleNameA11yExample = {
  name: 'Linked wordmark without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-wordmark',
          properties: { href: '/' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-wordmark',
          properties: { href: '/', aria: { 'aria-label': 'Porsche home' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
