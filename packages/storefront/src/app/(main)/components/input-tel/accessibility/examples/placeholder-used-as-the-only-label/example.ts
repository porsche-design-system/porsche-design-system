import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-tel',
          properties: { name: 'phone', placeholder: 'Phone' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-tel',
          properties: {
            name: 'phone',
            label: 'Phone number',
            description: 'Include your country code, for example +49.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
