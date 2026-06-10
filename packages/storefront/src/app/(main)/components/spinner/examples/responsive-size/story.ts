'use client';

import type { Story } from '@/models/story';

export const spinnerStoryResponsiveSize: Story<'p-spinner'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};

