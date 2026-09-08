import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: { name: 'website', label: 'Website URL', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: {
            name: 'website',
            label: 'Website URL',
            state: 'error',
            message: 'Enter a valid URL, for example https://www.porsche.com.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
