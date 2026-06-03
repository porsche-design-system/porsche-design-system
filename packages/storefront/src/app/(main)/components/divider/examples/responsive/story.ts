'use client';

import type { Story } from '@/models/story';

export const dividerStoryResponsive: Story<'p-divider'> = {
  state: {
    properties: {
      direction: { base: 'horizontal', l: 'vertical' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'lg:flex lg:h-[150px]',
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

