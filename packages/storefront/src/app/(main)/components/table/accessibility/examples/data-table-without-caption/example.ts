import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dataTableWithoutCaptionA11yExample = {
  name: 'Data table without caption',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-table',
          children: [
            {
              tag: 'p-table-head',
              children: ['...'],
            },
            {
              tag: 'p-table-body',
              children: ['...'],
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
          tag: 'p-table',
          properties: { caption: 'Available Porsche 911 models and starting prices' },
          children: [
            {
              tag: 'p-table-head',
              children: ['...'],
            },
            {
              tag: 'p-table-body',
              children: ['...'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
