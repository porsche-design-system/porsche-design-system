'use client';

import type { Story } from '@/models/story';

export const wordmarkStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};
