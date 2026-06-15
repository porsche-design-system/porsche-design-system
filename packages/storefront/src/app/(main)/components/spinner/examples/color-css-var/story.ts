'use client';

import type { Story } from '@/models/story';

export const spinnerStoryColorCSSVar: Story<'p-spinner'> = {
  state: {
    properties: {
      className: '[--p-spinner-color:deeppink] [--p-spinner-track-color:lightpink]',
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

