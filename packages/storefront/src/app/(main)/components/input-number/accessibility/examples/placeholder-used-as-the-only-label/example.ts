import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-number',
          properties: { name: 'speed', placeholder: 'Top speed', unit: 'kmh' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-number',
          properties: {
            name: 'speed',
            label: 'Top speed',
            unit: 'kmh',
            description: 'Enter the maximum speed in kilometers per hour.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
