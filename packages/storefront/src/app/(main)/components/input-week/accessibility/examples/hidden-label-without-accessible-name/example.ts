import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: { name: 'week', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: { name: 'week', hideLabel: true, label: 'Calendar week' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
