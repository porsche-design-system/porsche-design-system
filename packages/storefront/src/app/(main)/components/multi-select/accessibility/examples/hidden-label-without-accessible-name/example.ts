import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-multi-select',
          properties: { name: 'features', hideLabel: true },
          children: [
            {
              tag: 'p-multi-select-option',
              properties: { value: 'sport' },
              children: ['Sport Chrono Package'],
            },
          ],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-multi-select',
          properties: { label: 'Optional features', name: 'features', hideLabel: true },
          children: [
            {
              tag: 'p-multi-select-option',
              properties: { value: 'sport' },
              children: ['Sport Chrono Package'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
