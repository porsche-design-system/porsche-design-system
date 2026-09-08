import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-time',
          properties: { name: 'time', label: 'Appointment time', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-time',
          properties: {
            name: 'time',
            label: 'Appointment time',
            state: 'error',
            message: 'Enter a valid appointment time.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
