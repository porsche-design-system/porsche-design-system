'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const textStory: Story<'p-text'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

