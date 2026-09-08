import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            label: 'I accept the terms and conditions',
            'aria-invalid': true,
            message: 'Required',
          },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            label: 'I accept the terms and conditions',
            required: true,
            state: 'error',
            message: 'Accept the terms and conditions to continue.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
