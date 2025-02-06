'use client';

import type { Story } from '@/models/story';

export const popoverStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};
