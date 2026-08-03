import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const indicatingTheCurrentPageA11yExample = {
  name: 'Indicating the current page',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link',
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
          tag: 'p-link',
          properties: { href: '/models/911', aria: { 'aria-current': 'page' } },
          children: ['911 Carrera'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
