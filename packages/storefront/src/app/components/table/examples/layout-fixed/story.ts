'use client';

import type { Story } from '@/models/story';

export const tableStoryLayoutFixed: Story<'p-table'> = {
  state: { properties: { caption: 'Some caption', layout: 'fixed' } },
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
                {
                  tag: 'p-table-head-cell',
                  properties: { className: 'w-[50%] max-w-[50%]' },
                  children: ['Column 1 (50%)'],
                },
                {
                  tag: 'p-table-head-cell',
                  properties: { className: 'w-[150px] max-w-[150px]' },
                  children: ['Column 2 (150px)'],
                },
                { tag: 'p-table-head-cell', children: ['Column 3 (auto)'] },
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
                { tag: 'p-table-cell', properties: { className: 'w-[50%] max-w-[50%]' }, children: ['Cell 1'] },
                {
                  tag: 'p-table-cell',
                  properties: { className: 'w-[150px] max-w-[150px]' },
                  children: ['Cell 2'],
                },
                { tag: 'p-table-cell', children: ['Cell 3'] },
              ],
            },
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', properties: { className: 'w-[50%] max-w-[50%]' }, children: ['Cell 1'] },
                {
                  tag: 'p-table-cell',
                  properties: { className: 'w-[150px] max-w-[150px]' },
                  children: [
                    {
                      tag: 'p-text',
                      properties: { ellipsis: true, title: 'Cell 2 with more content' },
                      children: ['Cell 2 with more content'],
                    },
                  ],
                },
                { tag: 'p-table-cell', children: ['Cell 3'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

