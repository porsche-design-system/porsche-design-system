import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-switch',
          properties: { name: 'notifications', hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-switch',
          properties: { name: 'notifications', hideLabel: true },
          children: ['Email notifications for order updates'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
