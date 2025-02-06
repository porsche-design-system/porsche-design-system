'use client';

import type { Story } from '@/models/story';

export const wordmarkStory: Story<'p-wordmark'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};
