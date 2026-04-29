/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: used in examples */
'use client';

import type { Story } from '@/models/story';

export const gridEmotionStoryArea: Story<'div'> = {
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
          children: ['...gridStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-full p-fluid-sm bg-[rgba(0,0,255,.25)]',
          },
          children: ['gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-wide p-fluid-sm bg-[rgba(0,255,255,.25)]',
          },
          children: ['gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-extended p-fluid-sm bg-[rgba(0,255,0,.25)]',
          },
          children: ['gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-basic p-fluid-sm bg-[rgba(255,0,255,.25)]',
          },
          children: ['gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`'],
        },
        {
          tag: 'div',
          properties: {
            className: 'col-narrow p-fluid-sm bg-[rgba(255,255,0,.25)]',
          },
          children: ['gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`'],
        },
      ],
    },
  ],
};

export const gridEmotionStoryDivision: Story<'div'> = {
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
          children: ['...gridStyle'],
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
              children: ['gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]',
              },
              children: ['gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`'],
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
              children: ['gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicSpanOneThird}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]',
              },
              children: ['gridColumn: `${gridBasicSpanTwoThirds} / ${gridBasicColumnEnd}`'],
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
              children: ['gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`'],
            },
            {
              tag: 'div',
              properties: {
                className: 'col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]',
              },
              children: ['gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`'],
            },
          ],
        },
      ],
    },
  ],
};
