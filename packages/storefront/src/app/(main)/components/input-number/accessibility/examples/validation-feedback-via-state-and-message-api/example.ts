import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const validationFeedbackViaStateAndMessageApiA11yExample = {
  name: 'Validation feedback via state and message API',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-number',
          properties: { name: 'speed', label: 'Top speed', 'aria-invalid': true, message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-number',
          properties: {
            name: 'speed',
            label: 'Top speed',
            unit: 'kmh',
            description: 'Enter the maximum speed in kilometers per hour.',
            state: 'error',
            message: 'Enter a speed between 0 and 350 kilometers per hour.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
