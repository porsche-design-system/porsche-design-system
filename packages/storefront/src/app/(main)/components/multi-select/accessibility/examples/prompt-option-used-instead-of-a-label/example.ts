import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const promptOptionUsedInsteadOfALabelA11yExample = {
  name: 'Prompt option used instead of a label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-multi-select',
          properties: { name: 'features' },
          children: [
            {
              tag: 'p-multi-select-option',
              properties: { value: '' },
              children: ['Select features'],
            },
            {
              tag: 'p-multi-select-option',
              properties: { value: 'sport' },
              children: ['Sport Chrono Package'],
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
          tag: 'p-multi-select',
          properties: {
            label: 'Optional features',
            name: 'features',
            description: 'Select all features for your configuration.',
          },
          children: [
            {
              tag: 'p-multi-select-option',
              properties: { value: 'sport' },
              children: ['Sport Chrono Package'],
            },
            {
              tag: 'p-multi-select-option',
              properties: { value: 'audio' },
              children: ['BOSE Surround Sound'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
