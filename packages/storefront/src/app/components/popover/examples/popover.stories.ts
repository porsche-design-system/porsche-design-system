'use client';

import type { Story } from '@/models/story';

export const popoverStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};
