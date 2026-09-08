import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-tel',
          properties: { name: 'phone', label: 'Phone number', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-tel',
          properties: {
            name: 'phone',
            label: 'Phone number',
            state: 'error',
            message: 'Enter a valid phone number including your country code.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
