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

export const wordmarkStorySizeInherit: Story<'p-wordmark'> = {
  state: {
    properties: {
      className: 'h-[20px]',
      size: 'inherit',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
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
