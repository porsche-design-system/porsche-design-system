'use client';

import type { Story } from '@/models/story';

export const buttonPureStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};
