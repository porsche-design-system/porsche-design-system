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

export const headingStoryCustomColor: Story<'p-heading'> = {
  generator: () => [
    {
      tag: 'p-heading',
      properties: { tag: 'h3', color: 'inherit', className: 'text-[deeppink]' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
