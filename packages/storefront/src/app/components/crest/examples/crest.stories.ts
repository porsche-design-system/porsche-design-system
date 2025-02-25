'use client';

import type { Story } from '@/models/story';

export const crestStory: Story<'p-crest'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};
