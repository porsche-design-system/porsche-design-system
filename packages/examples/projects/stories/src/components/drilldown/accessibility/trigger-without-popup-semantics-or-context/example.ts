import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const triggerWithoutPopupSemanticsOrContextA11yExample = {
  name: 'Trigger without popup semantics or context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          children: ['Menu'],
        },
        {
          tag: 'p-drilldown',
          children: ['...'],
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
          children: ['Vehicle menu'],
        },
        {
          tag: 'p-drilldown',
          properties: { aria: { 'aria-label': 'Vehicle navigation' } },
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
