'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const textStorySize: Story<'p-text'> = {
  state: {
    properties: {
      className: 'text-[3rem]',
      size: 'inherit',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};


