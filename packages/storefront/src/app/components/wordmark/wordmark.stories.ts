'use client';

import type { Story } from '@/models/story';

export const wordmarkStory: Story<'p-wordmark'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};

export const wordmarkStorySize: Story<'p-wordmark'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-4',
      },
      children: [
        {
          tag: 'p-wordmark',
          properties: {
            className: '[--p-wordmark-width:auto] [--p-wordmark-height:50px]',
          },
        },
        {
          tag: 'p-wordmark',
          properties: {
            className: '[--p-wordmark-width:200px] [--p-wordmark-height:auto]',
          },
        },
      ],
    },
  ],
};

export const wordmarkStoryCustomPadding: Story<'p-wordmark'> = {
  state: {
    properties: {
      className: 'p-static-md',
      href: 'https://porsche.com',
      aria: {
        'aria-label': 'Porsche Homepage',
      },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};
