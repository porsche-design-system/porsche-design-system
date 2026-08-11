import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dialogLabelOnComponentHostVsHeaderSlotA11yExample = {
  name: 'Dialog label on component host vs header slot',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-sheet',
          properties: { 'aria-label': 'Filters' },
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
        { comment: 'or with aria prop when no visible header is shown' },
        {
          tag: 'p-sheet',
          properties: { aria: { 'aria-label': 'Filter results' } },
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
