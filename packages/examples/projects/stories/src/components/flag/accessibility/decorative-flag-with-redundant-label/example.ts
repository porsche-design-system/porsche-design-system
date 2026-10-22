import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const decorativeFlagWithRedundantLabelA11yExample = {
  name: 'Decorative flag with redundant label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-flag',
          properties: { name: 'germany', aria: { 'aria-label': 'Germany' } },
        },
        {
          tag: 'p-text',
          children: ['Germany'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-flag',
          properties: { name: 'germany', ariaHidden: true },
        },
        {
          tag: 'p-text',
          children: ['Germany'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
