import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const errorStateWithoutRecoveryGuidanceA11yExample = {
  name: 'Error state without recovery guidance',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-fieldset',
          properties: { label: 'Delivery address', state: 'error', message: 'Invalid' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-fieldset',
          properties: {
            label: 'Delivery address',
            required: true,
            state: 'error',
            message: 'Complete all required address fields to continue.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
