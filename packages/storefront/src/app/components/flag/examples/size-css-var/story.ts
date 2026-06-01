'use client';

import type { Story } from '@/models/story';

export const flagStorySizeCSSVar: Story<'p-flag'> = {
  state: {
    properties: {
      className: '[--p-flag-size:48px]',
      name: 'de',
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

