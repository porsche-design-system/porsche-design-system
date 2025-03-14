'use client';

import type { Story } from '@/models/story';

export const headlineStory: Story<'p-headline'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-headline',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
