'use client';

import type { Story } from '@/models/story';

export const gridScssStoryArea: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid-template prose-text-sm text-center _pds-grid-visualization',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'col-full p-fluid-sm',
          },
          children: ['@include pds-grid;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-full p-fluid-sm bg-[rgba(0,0,255,.25)]',
          },
          children: ['grid-column: $pds-grid-full-column-start / $pds-grid-full-column-end;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-wide p-fluid-sm bg-[rgba(0,255,255,.25)]',
          },
          children: ['grid-column: $pds-grid-wide-column-start / $pds-grid-wide-column-end;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-extended p-fluid-sm bg-[rgba(0,255,0,.25)]',
          },
          children: ['grid-column: $pds-grid-extended-column-start / $pds-grid-extended-column-end;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-basic p-fluid-sm bg-[rgba(255,0,255,.25)]',
          },
          children: ['grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-narrow p-fluid-sm bg-[rgba(255,255,0,.25)]',
          },
          children: ['grid-column: $pds-grid-basic-narrow-start / $pds-grid-narrow-column-end;'],
        },
      ],
    },
  ],
};

export const gridScssStoryDivision: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid-template prose-text-sm text-center _pds-grid-visualization',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'col-full p-fluid-sm',
          },
          children: ['@include pds-grid;'],
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
              children: ['grid-column: $pds-grid-extended-column-start / $pds-grid-extended-span-one-half;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['grid-column: $pds-grid-extended-span-one-half / $pds-grid-extended-column-end;'],
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
              children: ['grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-one-half;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-span-one-half / $pds-grid-basic-column-end;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-one-third;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-span-one-third;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-span-one-third / $pds-grid-basic-column-end;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-two-thirds;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-span-one-third / $pds-grid-basic-column-end;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-one-third;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['grid-column: $pds-grid-basic-span-two-thirds / $pds-grid-basic-column-end;'],
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
              children: ['grid-column: $pds-grid-narrow-column-start / $pds-grid-narrow-span-one-half;'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['grid-column: $pds-grid-narrow-span-one-half / $pds-grid-narrow-column-end;'],
            },
          ],
        },
      ],
    },
  ],
};
