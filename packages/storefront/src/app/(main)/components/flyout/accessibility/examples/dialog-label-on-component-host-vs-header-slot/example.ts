import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dialogLabelOnComponentHostVsHeaderSlotA11yExample = {
  name: 'Dialog label on component host vs header slot',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-flyout',
          properties: { 'aria-label': 'Navigation' },
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
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Main navigation'],
            },
            '...',
          ],
        },
        { comment: 'or with aria prop when no visible header is shown' },
        {
          tag: 'p-flyout',
          properties: { aria: { 'aria-label': 'Main navigation' } },
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
