'use client';

import type { Story } from '@/models/story';

export const iconStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
