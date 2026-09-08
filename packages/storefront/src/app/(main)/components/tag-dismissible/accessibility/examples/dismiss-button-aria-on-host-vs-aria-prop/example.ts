import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dismissButtonAriaOnHostVsAriaPropA11yExample = {
  name: 'Dismiss button ARIA on host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tag-dismissible',
          properties: { label: 'Sport Chrono', 'aria-label': 'Remove Sport Chrono filter' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tag-dismissible',
          properties: { label: 'Sport Chrono', aria: { 'aria-label': 'Remove Sport Chrono filter' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
