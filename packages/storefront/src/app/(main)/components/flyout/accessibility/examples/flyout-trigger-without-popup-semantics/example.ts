import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const flyoutTriggerWithoutPopupSemanticsA11yExample = {
  name: 'Flyout trigger without popup semantics',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          children: ['Open dialog'],
        },
        {
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Dialog heading'],
            },
            '...',
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
          tag: 'p-button',
          properties: { aria: { 'aria-haspopup': 'dialog' } },
          children: ['Open dialog'],
        },
        {
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Dialog heading'],
            },
            '...',
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
