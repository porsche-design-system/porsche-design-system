'use client';

import type { Story } from '@/models/story';

export const dividerStory: Story<'p-divider'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-divider',
      properties,
    },
  ],
};

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
