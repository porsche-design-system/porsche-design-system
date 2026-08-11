import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnTriggerButtonHostVsAriaPropA11yExample = {
  name: 'ARIA on trigger button host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { 'aria-haspopup': 'dialog' },
          children: ['Filter results'],
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
      ],
    },
  },
} satisfies AccessibilityExample;
