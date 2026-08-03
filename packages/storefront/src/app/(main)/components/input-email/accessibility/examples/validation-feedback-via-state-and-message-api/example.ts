import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-email',
          properties: { name: 'email', label: 'Email', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-email',
          properties: {
            name: 'email',
            label: 'Email address',
            state: 'error',
            message: 'Enter a valid email address, for example name@example.com.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
