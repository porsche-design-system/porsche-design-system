'use client';

import type { Story } from '@/models/story';

export const flagStoryResponsiveSize: Story<'p-flag'> = {
  state: {
    properties: {
      name: 'de',
      size: { base: 'sm', l: '2xl' },
      aria: { 'aria-label': 'Flag of Germany' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties,
    },
  ],
};

