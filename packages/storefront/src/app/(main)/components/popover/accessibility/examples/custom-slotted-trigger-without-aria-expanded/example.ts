import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const customSlottedTriggerWithoutAriaExpandedA11yExample = {
  name: 'Custom slotted trigger without aria-expanded',
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
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button', ariaExpanded: 'false' },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
