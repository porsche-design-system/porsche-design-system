'use client';

import type { Story } from '@porsche-design-system/story-generator';

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

