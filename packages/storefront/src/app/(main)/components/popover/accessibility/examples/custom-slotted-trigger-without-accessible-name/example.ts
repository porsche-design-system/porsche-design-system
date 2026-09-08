import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const customSlottedTriggerWithoutAccessibleNameA11yExample = {
  name: 'Custom slotted trigger without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button' },
            },
            'Additional specification details.',
          ],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: { description: 'Additional specification details.' },
        },
        { comment: 'or provide an accessible name on a custom slotted button' },
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button', ariaLabel: 'Specification details' },
              children: ['i'],
            },
            'Additional specification details.',
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
