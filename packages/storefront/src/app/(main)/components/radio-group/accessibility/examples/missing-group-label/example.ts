import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const missingGroupLabelA11yExample = {
  name: 'Missing group label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-radio-group',
          properties: { name: 'fuel' },
          children: [
            {
              tag: 'p-radio-group-option',
              properties: { value: 'electric', label: 'Electric' },
            },
            {
              tag: 'p-radio-group-option',
              properties: { value: 'hybrid', label: 'Hybrid' },
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
          tag: 'p-radio-group',
          properties: { label: 'Powertrain', name: 'fuel', description: 'Select your preferred powertrain.' },
          children: [
            {
              tag: 'p-radio-group-option',
              properties: { value: 'electric', label: 'Electric' },
            },
            {
              tag: 'p-radio-group-option',
              properties: { value: 'hybrid', label: 'Hybrid' },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
