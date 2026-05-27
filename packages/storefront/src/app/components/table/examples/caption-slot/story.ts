'use client';

import type { Story } from '@/models/story';

export const tableStoryCaptionSlot: Story<'p-table'> = {
  generator: () => [
    {
      tag: 'p-table',
      children: [
        {
          tag: 'p-heading',
          properties: { slot: 'caption', size: 'large' },
          children: ['Some slotted caption'],
        },
        {
          tag: 'p-table-head',
          children: [
            {
              tag: 'p-table-head-row',
              children: [
                { tag: 'p-table-head-cell', children: ['Column 1'] },
                { tag: 'p-table-head-cell', children: ['Column 2'] },
                { tag: 'p-table-head-cell', children: ['Column 3'] },
              ],
            },
          ],
        },
        {
          tag: 'p-table-body',
          children: [
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', children: ['Cell 1'] },
                { tag: 'p-table-cell', children: ['Cell 2'] },
                { tag: 'p-table-cell', children: ['Cell 3'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

