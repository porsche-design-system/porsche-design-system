import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const switchWithoutDescriptiveLabelA11yExample = {
  name: 'Switch without descriptive label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-switch',
          properties: { name: 'notifications' },
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
          properties: { name: 'notifications' },
          children: ['Email notifications for order updates'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
