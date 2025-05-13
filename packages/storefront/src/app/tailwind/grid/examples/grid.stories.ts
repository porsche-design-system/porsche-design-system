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
            className: 'col-full p-fluid-sm bg-[rgba(0,0,255,.25)]',
          },
          children: ['.col-full'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-wide p-fluid-sm bg-[rgba(0,255,255,.25)]',
          },
          children: ['.col-wide'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-extended p-fluid-sm bg-[rgba(0,255,0,.25)]',
          },
          children: ['.col-extended'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-basic p-fluid-sm bg-[rgba(255,0,255,.25)]',
          },
          children: ['.col-basic'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-narrow p-fluid-sm bg-[rgba(255,255,0,.25)]',
          },
          children: ['.col-narrow'],
        },
      ],
    },
  ],
};

export const gridStoryDivision: Story<'div'> = {
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
            className: 'col-wide grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,255,.25)]',
              },
              children: ['.col-span-one-half'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,255,.25)]',
              },
              children: ['.col-span-one-half'],
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-extended grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['.col-span-one-half'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['.col-span-one-half'],
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-basic grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-half'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-half'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-third'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-third'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-third'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-two-thirds'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-third'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-one-third'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['.col-span-two-thirds'],
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-narrow grid grid-cols-subgrid gap-y-fluid-md',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['.col-span-one-half'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['.col-span-one-half'],
            },
          ],
        },
      ],
    },
  ],
};
