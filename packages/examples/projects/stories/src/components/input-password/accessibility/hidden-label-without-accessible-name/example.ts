import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-password',
          properties: { name: 'password', hideLabel: true },
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
          properties: { name: 'password', hideLabel: true, label: 'Password' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
