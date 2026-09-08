'use client';

import type { Story } from '@/models/story';

export const spinnerStorySizeCSSVar: Story<'p-spinner'> = {
  state: {
    properties: {
      className: '[--p-spinner-size:48px]',
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

