import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const errorFeedbackWithoutDescriptiveContentA11yExample = {
  name: 'Error feedback without descriptive content',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-banner',
          properties: { open: true, state: 'error', description: 'Error' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-banner',
          properties: {
            open: true,
            state: 'error',
            heading: 'Payment could not be processed',
            description: 'Check your card details or try another payment method.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
