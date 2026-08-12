import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const statusConveyedByColorAndIconOnlyA11yExample = {
  name: 'Status conveyed by color and icon only',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tag',
          properties: { variant: 'success', icon: 'check' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tag',
          properties: { variant: 'success', icon: 'check' },
          children: ['Configuration saved'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
