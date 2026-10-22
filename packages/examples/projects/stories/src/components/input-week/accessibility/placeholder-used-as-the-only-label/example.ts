import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: { name: 'week', placeholder: 'Week' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-week',
          properties: { name: 'week', label: 'Calendar week', description: 'Select the week for your test drive.' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
