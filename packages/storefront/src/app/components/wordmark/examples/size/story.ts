'use client';

import type { Story } from '@/models/story';

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

