'use client';

import type { Story } from '@/models/story';

export const iconStory: Story<'p-icon'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
