'use client';

import type { Story } from '@/models/story';

export const tagStory: Story<'p-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag',
      properties,
      children: ['Some label'],
    },
  ],
};
