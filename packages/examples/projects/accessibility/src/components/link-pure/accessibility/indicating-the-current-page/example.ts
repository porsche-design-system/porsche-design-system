import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const indicatingTheCurrentPageA11yExample = {
  name: 'Indicating the current page',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
          properties: { href: '/models/911', 'aria-current': 'page' },
          children: ['911'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
          properties: { href: '/models/911', aria: { 'aria-current': 'page' } },
          children: ['911 Carrera'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
