import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const informativeFlagWithoutAccessibleNameA11yExample = {
  name: 'Informative flag without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-flag',
          properties: { name: 'germany' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-flag',
          properties: { name: 'germany', aria: { 'aria-label': 'Germany' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
