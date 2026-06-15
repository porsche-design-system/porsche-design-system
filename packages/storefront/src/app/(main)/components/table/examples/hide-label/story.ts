'use client';

import type { Story } from '@/models/story';

export const tableStoryHideLabel: Story<'p-table'> = {
  state: { properties: { caption: 'Some caption' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-table',
      properties,
      children: [
        {
          tag: 'p-table-head',
          children: [
            {
              tag: 'p-table-head-row',
              children: [
                { tag: 'p-table-head-cell', children: ['Column 1'] },
                { tag: 'p-table-head-cell', children: ['Column 2'] },
                { tag: 'p-table-head-cell', properties: { hideLabel: true }, children: ['Column 3'] },
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

