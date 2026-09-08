import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const placeholderOnlyInstructionsForOpenTextInputA11yExample = {
  name: 'Placeholder-only instructions for open text input',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-textarea',
          properties: { name: 'feedback', placeholder: 'Tell us what you think' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-textarea',
          properties: {
            name: 'feedback',
            label: 'Your feedback',
            description: 'Describe what worked well and what we should improve (min. 20 characters).',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
