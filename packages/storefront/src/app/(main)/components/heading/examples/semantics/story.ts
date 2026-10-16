'use client';

import type { Story } from '@porsche-design-system/story-generator';

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

