import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: { name: 'month', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: { name: 'month', hideLabel: true, label: 'Delivery month' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
