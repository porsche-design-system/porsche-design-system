import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: { 'aria-label': 'Specification details', description: 'Additional specification details.' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: {
            aria: { 'aria-label': 'Specification details' },
            description: 'Additional specification details.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
