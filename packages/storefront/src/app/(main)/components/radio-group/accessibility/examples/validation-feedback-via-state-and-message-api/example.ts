import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-radio-group',
          properties: { label: 'Powertrain', name: 'fuel', 'aria-invalid': true, message: 'Required' },
          children: [
            {
              tag: 'p-radio-group-option',
              properties: { value: 'electric', label: 'Electric' },
            },
            {
              tag: 'p-radio-group-option',
              properties: { value: 'hybrid', label: 'Hybrid' },
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
          tag: 'p-radio-group',
          properties: {
            label: 'Powertrain',
            name: 'fuel',
            required: true,
            state: 'error',
            message: 'Select a powertrain to continue.',
          },
          children: [
            {
              tag: 'p-radio-group-option',
              properties: { value: 'electric', label: 'Electric' },
            },
            {
              tag: 'p-radio-group-option',
              properties: { value: 'hybrid', label: 'Hybrid' },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
