import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-tile',
          properties: { label: 'Details', href: '#', 'aria-label': 'Details of Porsche Taycan' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-tile',
          properties: { label: 'Details', href: '#', aria: { 'aria-label': 'Details of Porsche Taycan' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
