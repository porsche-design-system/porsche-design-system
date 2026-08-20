import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueButtonLabelWithoutContextA11yExample = {
  name: 'Vague button label without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { icon: 'plus' },
          children: ['Add'],
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
          properties: { icon: 'plus', aria: { 'aria-label': 'Add item XYZ to shopping cart' } },
          children: ['Add'],
        },
        { comment: 'or use descriptive visible text' },
        {
          tag: 'p-button-pure',
          properties: { icon: 'plus' },
          children: ['Add item XYZ to cart'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
