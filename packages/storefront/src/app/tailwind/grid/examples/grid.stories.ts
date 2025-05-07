'use client';

import type { Story } from '@/models/story';

export const gridStoryArea: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'pds-grid _pds-grid-visualization text-primary text-center' },
      children: [
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-full-column-start) col-end-(--pds-grid-full-column-end) p-fluid-sm bg-[rgba(0,0,255,.25)]',
          },
          children: ['.col-start-(--pds-grid-full-column-start) / .col-end-(--pds-grid-full-column-end)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-wide-column-start) col-end-(--pds-grid-wide-column-end) p-fluid-sm bg-[rgba(0,255,255,.25)]',
          },
          children: ['.col-start-(--pds-grid-wide-column-start) / .col-end-(--pds-grid-wide-column-end)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-extended-column-start) col-end-(--pds-grid-extended-column-end) p-fluid-sm bg-[rgba(0,255,0,.25)]',
          },
          children: ['.col-start-(--pds-grid-extended-column-start) / .col-end-(--pds-grid-extended-column-end)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-basic-column-start) col-end-(--pds-grid-basic-column-end) p-fluid-sm bg-[rgba(255,0,255,.25)]',
          },
          children: ['.col-start-(--pds-grid-basic-column-start) / .col-end-(--pds-grid-basic-column-end)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-narrow-column-start) col-end-(--pds-grid-narrow-column-end) p-fluid-sm bg-[rgba(255,255,0,.25)]',
          },
          children: ['.col-start-(--pds-grid-narrow-column-start) / .col-end-(--pds-grid-narrow-column-end)'],
        },
      ],
    },
  ],
};

export const gridStoryTiles: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'pds-grid _pds-grid-visualization text-primary text-center',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-extended-column-start) col-end-(--pds-grid-extended-column-end) grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-extended-span-one-half) p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['.col-(--pds-grid-extended-span-one-half)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-extended-span-one-half) p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['.col-(--pds-grid-extended-span-one-half)'],
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-basic-column-start) col-end-(--pds-grid-basic-column-end) grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-half) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-half)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-half) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-half)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-third) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-third)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-third) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-third)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-third) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-third)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-two-thirds) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-two-thirds)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-third) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-third)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-one-third) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-one-third)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-basic-span-two-thirds) p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-(--pds-grid-basic-span-two-thirds)'],
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className:
              'col-start-(--pds-grid-narrow-column-start) col-end-(--pds-grid-narrow-column-end) grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-narrow-span-one-half) p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['.col-(--pds-grid-narrow-span-one-half)'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-(--pds-grid-narrow-span-one-half) p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['.col-(--pds-grid-narrow-span-one-half)'],
            },
          ],
        },
      ],
    },
  ],
};
