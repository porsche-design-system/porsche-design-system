import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: { label: 'Porsche model', name: 'model', 'aria-invalid': true, message: 'Required' },
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
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: {
            label: 'Porsche model',
            name: 'model',
            state: 'error',
            message: 'Select a model to continue with your configuration.',
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
