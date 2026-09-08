import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const sheetTriggerWithoutPopupSemanticsA11yExample = {
  name: 'Sheet trigger without popup semantics',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          children: ['Open'],
        },
        {
          tag: 'p-sheet',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Filters'],
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
          children: ['Filter results'],
        },
        {
          tag: 'p-sheet',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Filter results'],
            },
            '...',
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
