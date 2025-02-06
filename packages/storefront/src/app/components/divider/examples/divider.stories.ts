'use client';

import type { Story } from '@/models/story';

export const dividerStory: Story<'p-divider'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-divider',
      properties,
    },
  ],
};
