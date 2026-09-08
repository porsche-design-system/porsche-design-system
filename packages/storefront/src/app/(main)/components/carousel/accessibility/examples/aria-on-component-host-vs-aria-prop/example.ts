import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-carousel',
          properties: { 'aria-label': 'Slider' },
          children: [{ comment: 'slides' }],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-carousel',
          properties: { aria: { 'aria-label': 'Featured Porsche models' } },
          children: [{ comment: 'slides' }],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
