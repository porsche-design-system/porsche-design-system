'use client';

import type { Story } from '@/models/story';

export const headingStorySemantics: Story<'p-heading'> = {
  generator: () => [
    {
      tag: 'p-heading',
      properties: { tag: 'h3' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-heading',
      children: [
        {
          tag: 'h3',
          children: ['The quick brown fox jumps over the lazy dog'],
        },
      ],
    },
  ],
};

