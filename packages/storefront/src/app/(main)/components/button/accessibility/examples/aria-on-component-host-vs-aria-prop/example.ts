import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { 'aria-haspopup': 'dialog', 'aria-label': 'Open details of product XYZ' },
          children: ['Open details'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { aria: { 'aria-haspopup': 'dialog', 'aria-label': 'Open details of product XYZ' } },
          children: ['Open details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
