'use client';

import type { Story } from '@/models/story';

export const displayStory: Story<'p-display'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
