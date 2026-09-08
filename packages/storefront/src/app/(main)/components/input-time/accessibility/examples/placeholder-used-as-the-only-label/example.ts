import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderUsedAsTheOnlyLabelA11yExample = {
  name: 'Placeholder used as the only label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-time',
          properties: { name: 'time', placeholder: 'Time' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-time',
          properties: {
            name: 'time',
            label: 'Appointment time',
            description: 'Use 24-hour format, for example 14:30.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
