import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-pure',
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
          tag: 'p-button-pure',
          properties: { aria: { 'aria-haspopup': 'dialog', 'aria-label': 'Open details of product XYZ' } },
          children: ['Open details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
