import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            label: 'I accept the terms',
            'aria-label': 'Accessible name',
            'aria-description': 'Additional context',
          },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            label: 'I accept the terms',
            aria: { 'aria-label': 'Accessible name', 'aria-description': 'Additional context' },
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
