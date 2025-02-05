'use client';

import type { Story } from '@/components/playground/componentStory';

export const canvasStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-canvas',
      properties,
    },
  ],
};
