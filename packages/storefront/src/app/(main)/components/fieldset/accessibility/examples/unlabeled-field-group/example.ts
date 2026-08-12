import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const unlabeledFieldGroupA11yExample = {
  name: 'Unlabeled field group',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-fieldset',
          children: [
            {
              tag: 'p-input-text',
              properties: { name: 'street', label: 'Street' },
            },
            {
              tag: 'p-input-text',
              properties: { name: 'city', label: 'City' },
            },
          ],
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
          properties: { label: 'Delivery address' },
          children: [
            {
              tag: 'p-input-text',
              properties: { name: 'street', label: 'Street' },
            },
            {
              tag: 'p-input-text',
              properties: { name: 'city', label: 'City' },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
