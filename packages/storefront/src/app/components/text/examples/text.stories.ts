'use client';

import type { Story } from '@/models/story';

export const textStory: Story<'p-text'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
