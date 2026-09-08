'use client';

import type { Story } from '@/models/story';

export const dividerStoryVertical: Story<'p-divider'> = {
  state: {
    properties: {
      direction: 'vertical',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'flex h-[100px]',
      },
      children: [
        {
          tag: 'p-divider',
          properties,
        },
      ],
    },
  ],
};

