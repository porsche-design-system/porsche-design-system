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

export const headlineStorySemantics: Story<'p-headline'> = {
  generator: () => [
    {
      tag: 'p-headline',
      properties: { tag: 'h3' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-headline',
      children: [
        {
          tag: 'h3',
          children: ['The quick brown fox jumps over the lazy dog'],
        },
      ],
    },
  ],
};

export const headlineStoryCustomColor: Story<'p-headline'> = {
  generator: () => [
    {
      tag: 'p-headline',
      properties: { tag: 'h3', color: 'inherit', style: { color: 'deeppink' } },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
