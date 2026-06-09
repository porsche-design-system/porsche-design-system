'use client';

import type { Story } from '@/models/story';

export const iconStoryResponsiveSize: Story<'p-icon'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

