'use client';

import type { Story } from '@/models/story';

export const marqueStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-marque',
      properties,
    },
  ],
};
