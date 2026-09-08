import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-wordmark',
          properties: { href: '/', 'aria-label': 'Porsche home' },
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
