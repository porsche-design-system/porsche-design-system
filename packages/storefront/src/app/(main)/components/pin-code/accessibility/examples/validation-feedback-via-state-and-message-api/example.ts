import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-pin-code',
          properties: { name: 'verification', label: 'Verification code', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-pin-code',
          properties: {
            name: 'verification',
            length: 6,
            label: 'Verification code',
            state: 'error',
            message: 'Enter the complete 6-digit verification code.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
