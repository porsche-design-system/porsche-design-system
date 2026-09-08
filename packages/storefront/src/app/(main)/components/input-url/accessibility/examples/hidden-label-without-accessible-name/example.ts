import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: { name: 'website', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: { name: 'website', hideLabel: true, label: 'Website URL' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
