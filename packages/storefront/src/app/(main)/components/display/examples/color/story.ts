'use client';

import type { Story } from '@/models/story';

export const displayStoryColorInherit: Story<'p-display'> = {
  state: {
    properties: {
      tag: 'h3',
      color: 'inherit',
      className: 'text-[deeppink]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

