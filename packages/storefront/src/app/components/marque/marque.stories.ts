'use client';

import type { Story } from '@/models/story';

export const marqueStory: Story<'p-marque'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-marque',
      properties,
    },
  ],
};
