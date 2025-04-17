'use client';

import type { Story } from '@/models/story';

export const toastStory: Story<'p-toast'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-toast',
      properties,
    },
  ],
};
