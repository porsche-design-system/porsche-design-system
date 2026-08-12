import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: { name: 'model', hideLabel: true },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'carrera' },
              children: ['911 Carrera'],
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
          tag: 'p-select',
          properties: { label: 'Porsche model', name: 'model', hideLabel: true },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'carrera' },
              children: ['911 Carrera'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
