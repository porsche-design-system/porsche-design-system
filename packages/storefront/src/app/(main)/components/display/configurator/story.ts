'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const displayStory: Story<'p-display'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

