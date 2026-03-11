'use client';

import type { Story } from '@/models/story';

export const aiTagStory: Story<'p-ai-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-ai-tag',
      properties,
      children: [],
    },
  ],
};
