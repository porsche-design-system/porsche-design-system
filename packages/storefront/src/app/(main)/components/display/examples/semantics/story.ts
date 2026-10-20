'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const displayStorySemantics: Story<'p-display'> = {
  generator: () => [
    {
      tag: 'p-display',
      properties: {
        tag: 'h3',
      },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-display',
      children: [{ tag: 'h3', children: ['The quick brown fox jumps over the lazy dog'] }],
    },
  ],
};

