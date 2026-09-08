import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
          properties: { href: 'https://porsche.com', 'aria-label': 'Details of product XYZ' },
          children: ['Details'],
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
          properties: { href: 'https://porsche.com', aria: { 'aria-label': 'Details of product XYZ' } },
          children: ['Details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
