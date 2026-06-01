'use client';

import type { Story } from '@/models/story';

export const textStorySemantics: Story<'p-text'> = {
  generator: () => [
    {
      tag: 'p-text',
      properties: { tag: 'blockquote' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-text',
      children: [{ tag: 'blockquote', children: ['The quick brown fox jumps over the lazy dog'] }],
    },
  ],
};

