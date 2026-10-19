import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: { name: 'search', label: 'Search vehicles', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: {
            name: 'search',
            label: 'Search vehicles',
            state: 'error',
            message: 'Enter at least 3 characters to search.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
