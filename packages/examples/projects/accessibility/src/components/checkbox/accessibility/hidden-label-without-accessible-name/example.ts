import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: { name: 'terms', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            hideLabel: true,
            label: 'I accept the terms and conditions',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
