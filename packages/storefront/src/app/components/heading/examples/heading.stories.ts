'use client';

import type { Story } from '@/models/story';

export const headingStory: Story<'p-heading'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-heading',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
