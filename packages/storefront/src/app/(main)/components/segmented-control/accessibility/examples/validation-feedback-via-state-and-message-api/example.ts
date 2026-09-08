import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-segmented-control',
          properties: { label: 'T-shirt size', name: 'size', 'aria-invalid': true, message: 'Required' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-segmented-control',
          properties: {
            label: 'T-shirt size',
            name: 'size',
            required: true,
            state: 'error',
            message: 'Select a size to continue.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
