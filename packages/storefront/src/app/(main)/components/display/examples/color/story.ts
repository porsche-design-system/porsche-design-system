'use client';

import type { Story } from '@porsche-design-system/story-generator';

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

