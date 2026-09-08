import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-textarea',
          properties: { name: 'feedback', label: 'Your feedback', 'aria-invalid': true, message: 'Too short' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-textarea',
          properties: {
            name: 'feedback',
            label: 'Your feedback',
            state: 'error',
            message: 'Enter at least 20 characters so we can understand your feedback.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
