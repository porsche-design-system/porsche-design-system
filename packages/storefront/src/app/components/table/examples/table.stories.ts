'use client';

import type { Story } from '@/models/story';

export const tableStory: Story<'p-table'> = {
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
                { tag: 'p-table-head-cell', children: ['Model'] },
                { tag: 'p-table-head-cell', children: ['Date'] },
                { tag: 'p-table-head-cell', children: ['Purchase Intention'] },
                { tag: 'p-table-head-cell', children: ['Status'] },
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
                { tag: 'p-table-cell', children: ['19.06.2021'] },
                { tag: 'p-table-cell', children: ['New Car'] },
                { tag: 'p-table-cell', children: ['Lost'] },
                { tag: 'p-table-cell', children: ['0000824409'] },
              ],
            },
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', children: ['911 Carrera S'] },
                { tag: 'p-table-cell', children: ['19.05.2021'] },
                { tag: 'p-table-cell', children: ['Used Car'] },
                { tag: 'p-table-cell', children: ['Won'] },
                { tag: 'p-table-cell', children: ['0000824408'] },
              ],
            },
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', children: ['Macan Turbo'] },
                { tag: 'p-table-cell', children: ['10.05.2021'] },
                { tag: 'p-table-cell', children: ['Used Car'] },
                { tag: 'p-table-cell', children: ['Lost'] },
                { tag: 'p-table-cell', children: ['0000824407'] },
              ],
            },
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', children: ['Taycan'] },
                { tag: 'p-table-cell', children: ['03.05.2021'] },
                { tag: 'p-table-cell', children: ['New Car'] },
                { tag: 'p-table-cell', children: ['Won'] },
                { tag: 'p-table-cell', children: ['0000824406'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
