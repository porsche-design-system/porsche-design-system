import type { AccessibilityExample } from '@porsche-design-system/story-generator';

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
