import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: { name: 'week', label: 'Calendar week', 'aria-invalid': true, message: 'Required' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: {
            name: 'week',
            label: 'Calendar week',
            state: 'error',
            message: 'Select a calendar week to continue.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
