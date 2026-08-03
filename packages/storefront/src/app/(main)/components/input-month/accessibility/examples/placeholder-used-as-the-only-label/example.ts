import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: { name: 'month', placeholder: 'Month' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-month',
          properties: { name: 'month', label: 'Delivery month', description: 'Select the month for your delivery.' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
