import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-multi-select',
          properties: { label: 'Optional features', name: 'features', 'aria-invalid': true, message: 'Required' },
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
          properties: {
            label: 'Optional features',
            name: 'features',
            required: true,
            state: 'error',
            message: 'Select at least one feature to continue.',
          },
          children: [
            {
              tag: 'p-multi-select-option',
              properties: { value: 'sport' },
              children: ['Sport Chrono Package'],
            },
            {
              tag: 'p-multi-select-option',
              properties: { value: 'audio' },
              children: ['BOSE Surround Sound'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
