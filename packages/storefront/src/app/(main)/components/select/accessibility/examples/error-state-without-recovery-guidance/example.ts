import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const errorStateWithoutRecoveryGuidanceA11yExample = {
  name: 'Error state without recovery guidance',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: { label: 'Porsche model', name: 'model', state: 'error', message: 'Invalid' },
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
            required: true,
            state: 'error',
            message: 'Select a Porsche model. This field is required to continue.',
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
