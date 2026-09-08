'use client';

import type { Story } from '@/models/story';

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

