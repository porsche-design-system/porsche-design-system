import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-password',
          properties: { name: 'password', placeholder: 'Password' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-password',
          properties: {
            name: 'password',
            label: 'Password',
            description: 'Use at least 8 characters with one number.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
