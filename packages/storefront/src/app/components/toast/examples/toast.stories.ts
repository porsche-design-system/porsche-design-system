'use client';

import type { Story } from '@/models/story';

export const toastStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-toast',
      properties,
    },
  ],
};
