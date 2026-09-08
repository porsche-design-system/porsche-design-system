import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-date',
          properties: { name: 'birthdate', placeholder: 'Date of birth' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-date',
          properties: { name: 'birthdate', label: 'Date of birth', description: 'Enter day, month, and year.' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
