import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-tile',
          properties: { label: 'Open', 'aria-label': 'Open details of Porsche Taycan', 'aria-haspopup': 'dialog' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-tile',
          properties: {
            label: 'Open',
            aria: { 'aria-haspopup': 'dialog', 'aria-label': 'Open details of Porsche Taycan' },
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
