import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueCarouselLabelA11yExample = {
  name: 'Vague carousel label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-carousel',
          properties: { aria: { 'aria-label': 'Slider' } },
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
