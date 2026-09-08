import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-date',
          properties: { name: 'birthdate', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-date',
          properties: { name: 'birthdate', hideLabel: true, label: 'Date of birth' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
