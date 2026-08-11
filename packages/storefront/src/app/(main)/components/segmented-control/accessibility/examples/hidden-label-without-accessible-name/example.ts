import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const hiddenLabelWithoutAccessibleNameA11yExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-segmented-control',
          properties: { name: 'size', hideLabel: true },
          children: [
            {
              tag: 'p-segmented-control-item',
              properties: { value: 's' },
              children: ['S'],
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
          properties: { label: 'T-shirt size', name: 'size', hideLabel: true },
          children: [
            {
              tag: 'p-segmented-control-item',
              properties: { value: 's' },
              children: ['S'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
