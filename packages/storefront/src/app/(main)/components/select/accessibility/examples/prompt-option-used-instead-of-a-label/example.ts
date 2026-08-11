import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const promptOptionUsedInsteadOfALabelA11yExample = {
  name: 'Prompt option used instead of a label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: { name: 'model' },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: '' },
              children: ['Select a model'],
            },
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
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: {
            label: 'Porsche model',
            name: 'model',
            description: 'Choose the model for your configuration.',
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
