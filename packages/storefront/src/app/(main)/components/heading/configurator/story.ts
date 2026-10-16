'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const headingStory: Story<'p-heading'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-heading',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

