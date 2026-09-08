import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: { name: 'search', placeholder: 'Search' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: { name: 'search', label: 'Search vehicles', description: 'Search by model name or VIN.' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
