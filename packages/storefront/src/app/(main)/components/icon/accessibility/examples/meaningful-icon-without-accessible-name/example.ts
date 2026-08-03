import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const meaningfulIconWithoutAccessibleNameA11yExample = {
  name: 'Meaningful icon without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-icon',
          properties: { name: 'warning' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-icon',
          properties: { name: 'warning', aria: { 'aria-label': 'Warning' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
