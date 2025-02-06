'use client';

import type { Story } from '@/models/story';

export const switchStory: Story<'p-switch'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-switch',
      properties,
      children: ['Some label'],
    },
  ],
};
