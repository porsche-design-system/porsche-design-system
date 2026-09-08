'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithTable: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'w-full' },
      children: [
        {
          tag: 'p-table',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'caption', size: 'large', tag: 'h3' },
              children: ['Some slotted caption'],
            },
            {
              tag: 'p-table-head',
              children: [
                {
                  tag: 'p-table-head-row',
                  children: [
                    {
                      tag: 'p-table-head-cell',
                      properties: { sort: { id: 'model', active: true, direction: 'desc' } },
                      children: ['Model'],
                    },
                    { tag: 'p-table-head-cell', children: ['Date'] },
                    { tag: 'p-table-head-cell', children: ['Purchase Intention'] },
                    {
                      tag: 'p-table-head-cell',
                      children: [
                        {
                          tag: 'span',
                          properties: { className: 'inline-flex items-center gap-static-sm' },
                          children: ['Status', { tag: 'p-ai-tag', properties: { variant: 'abbreviation' } }],
                        },
                      ],
                    },
                    { tag: 'p-table-head-cell', children: ['Lead ID'] },
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
                    { tag: 'p-table-cell', children: ['718 Cayman'] },
                    { tag: 'p-table-cell', children: ['23.06.2021'] },
                    { tag: 'p-table-cell', children: ['New Car'] },
                    { tag: 'p-table-cell', children: ['Won'] },
                    { tag: 'p-table-cell', children: ['0000824402'] },
                  ],
                },
                {
                  tag: 'p-table-row',
                  children: [
                    { tag: 'p-table-cell', children: ['Panamera 4S'] },
                    { tag: 'p-table-cell', children: ['15.03.2023'] },
                    { tag: 'p-table-cell', children: ['Used Car'] },
                    { tag: 'p-table-cell', children: ['Lost'] },
                    { tag: 'p-table-cell', children: ['0000824408'] },
                  ],
                },
                {
                  tag: 'p-table-row',
                  children: [
                    { tag: 'p-table-cell', children: ['911 Carrera S'] },
                    { tag: 'p-table-cell', children: ['28.08.2025'] },
                    { tag: 'p-table-cell', children: ['New Car'] },
                    { tag: 'p-table-cell', children: ['Won'] },
                    { tag: 'p-table-cell', children: ['0000824409'] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

