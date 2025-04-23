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

export const tableStoryCaptionProperty: Story<'p-table'> = {
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
                  properties: { style: { width: '50%', maxWidth: '50%' } },
                  children: ['Column 1 (50%)'],
                },
                {
                  tag: 'p-table-head-cell',
                  properties: { style: { width: '150px', maxWidth: '150px' } },
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
                { tag: 'p-table-cell', properties: { style: { width: '50%', maxWidth: '50%' } }, children: ['Cell 1'] },
                {
                  tag: 'p-table-cell',
                  properties: { style: { width: '150px', maxWidth: '150px' } },
                  children: ['Cell 2'],
                },
                { tag: 'p-table-cell', children: ['Cell 3'] },
              ],
            },
            {
              tag: 'p-table-row',
              children: [
                { tag: 'p-table-cell', properties: { style: { width: '50%', maxWidth: '50%' } }, children: ['Cell 1'] },
                {
                  tag: 'p-table-cell',
                  properties: { style: { width: '150px', maxWidth: '150px' } },
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
