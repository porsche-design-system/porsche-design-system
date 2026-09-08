import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: { name: 'month', label: 'Delivery month', 'aria-invalid': true, message: 'Required' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: {
            name: 'month',
            label: 'Delivery month',
            state: 'error',
            message: 'Select a delivery month to continue.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
