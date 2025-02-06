'use client';

import type { Story } from '@/models/story';

export const crestStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};
