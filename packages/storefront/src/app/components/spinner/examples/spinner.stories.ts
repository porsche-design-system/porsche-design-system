'use client';

import type { Story } from '@/models/story';

export const spinnerStory: Story<'p-spinner'> = {
  state: {
    properties: { aria: { 'aria-label': 'Loading page content' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};
