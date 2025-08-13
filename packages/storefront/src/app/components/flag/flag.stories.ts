'use client';

import type { Story } from '@/models/story';

export const flagStory: Story<'p-flag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties,
    },
  ],
};
