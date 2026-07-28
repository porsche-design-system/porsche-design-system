import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dialogLabelOnComponentHostVsHeaderSlotA11yExample = {
  name: 'Dialog label on component host vs header slot',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-modal',
          properties: { 'aria-label': 'Details' },
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
        { comment: 'or with aria prop when no visible header is shown' },
        {
          tag: 'p-modal',
          properties: { aria: { 'aria-label': 'Details of product XYZ' } },
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
