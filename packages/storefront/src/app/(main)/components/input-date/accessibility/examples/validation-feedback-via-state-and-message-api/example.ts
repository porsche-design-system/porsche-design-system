import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-date',
          properties: { name: 'birthdate', label: 'Date of birth', 'aria-invalid': true, message: 'Invalid' },
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
          properties: {
            name: 'birthdate',
            label: 'Date of birth',
            state: 'error',
            message: 'Enter a valid date of birth.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
