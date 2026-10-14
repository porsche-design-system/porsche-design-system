import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-email',
          properties: {
            name: 'email',
            label: 'Email address',
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
          tag: 'p-input-email',
          properties: {
            name: 'email',
            label: 'Email address',
            aria: { 'aria-label': 'Accessible name', 'aria-description': 'Additional context' },
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
