import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: { name: 'website', placeholder: 'https://' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-url',
          properties: { name: 'website', label: 'Website URL', description: 'Include https:// at the beginning.' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
