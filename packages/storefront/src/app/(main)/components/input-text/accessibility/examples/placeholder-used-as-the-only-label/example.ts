import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-text',
          properties: { name: 'email', placeholder: 'Email' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-text',
          properties: {
            name: 'email',
            label: 'Email address',
            description: 'We use this to send your confirmation.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
