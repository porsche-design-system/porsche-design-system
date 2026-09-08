import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const carouselWithoutSkipPathForKeyboardUsersA11yExample = {
  name: 'Carousel without skip path for keyboard users',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-carousel',
          children: [{ comment: 'many slides (>6 items)' }],
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
          properties: { skipLinkTarget: '#after-carousel', aria: { 'aria-label': 'Highlights' } },
          children: [{ comment: 'many slides (>6 items)' }],
        },
        {
          tag: 'p-heading',
          properties: { tag: 'h2', id: 'after-carousel' },
          children: ['Next section'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
