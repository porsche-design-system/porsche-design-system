import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-pin-code',
          properties: { name: 'verification', length: 6, hideLabel: true },
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
          properties: { name: 'verification', length: 6, hideLabel: true, label: 'Verification code' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
