import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ambiguousOptionLabelsWithoutFieldContextA11yExample = {
  name: 'Ambiguous option labels without field context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: { label: 'Model', name: 'model' },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'base' },
              children: ['Base'],
            },
            {
              tag: 'p-select-option',
              properties: { value: 's' },
              children: ['S'],
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
          properties: {
            label: 'Porsche 911 trim',
            name: 'model',
            description: 'Select the trim level for your configuration.',
          },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'carrera' },
              children: ['911 Carrera'],
            },
            {
              tag: 'p-select-option',
              properties: { value: 'carrera-s' },
              children: ['911 Carrera S'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
