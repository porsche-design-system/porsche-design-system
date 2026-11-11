import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const iconOnlyButtonWithoutAccessibleNameA11yExample = {
  name: 'Icon-only button without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { icon: 'plus' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { icon: 'plus', hideLabel: true },
          children: ['Add item XYZ to shopping cart'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
