import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-password',
          properties: { name: 'password', label: 'Password', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-password',
          properties: {
            name: 'password',
            label: 'Password',
            state: 'error',
            message: 'Enter a password with at least 8 characters and one number.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
