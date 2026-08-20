import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const missingGroupLabelA11yExample = {
  name: 'Missing group label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-segmented-control',
          properties: { name: 'size' },
          children: [
            {
              tag: 'p-segmented-control-item',
              properties: { value: 's' },
              children: ['S'],
            },
            {
              tag: 'p-segmented-control-item',
              properties: { value: 'm' },
              children: ['M'],
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
          tag: 'p-segmented-control',
          properties: { label: 'T-shirt size', name: 'size', description: 'Select your preferred size.' },
          children: [
            {
              tag: 'p-segmented-control-item',
              properties: { value: 's' },
              children: ['S'],
            },
            {
              tag: 'p-segmented-control-item',
              properties: { value: 'm' },
              children: ['M'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
