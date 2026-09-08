import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const modalTriggerWithoutPopupSemanticsOrContextA11yExample = {
  name: 'Modal trigger without popup semantics or context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          children: ['Open'],
        },
        {
          tag: 'p-modal',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Details'],
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
          children: ['Details of product XYZ'],
        },
        {
          tag: 'p-modal',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Details of product XYZ'],
            },
            '...',
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
