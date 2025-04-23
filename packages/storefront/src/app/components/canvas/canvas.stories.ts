'use client';

import type { Story } from '@/models/story';

export const canvasStory: Story<'p-canvas'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-canvas',
      properties,
    },
  ],
};
