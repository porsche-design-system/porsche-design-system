'use client';

import type { Story } from '@/models/story';

export const canvasStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-canvas',
      properties,
    },
  ],
};
