'use client';

import type { Story } from '@/models/story';

export const buttonStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties,
      children: ['Some label'],
    },
  ],
};
