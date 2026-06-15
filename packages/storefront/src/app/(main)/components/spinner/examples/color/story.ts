'use client';

import type { Story } from '@/models/story';

export const spinnerStoryColor: Story<'p-spinner'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      color: 'inherit',
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        style: { color: 'light-dark(mediumvioletred, deeppink)' },
        color: 'inherit',
      },
      children: [
        {
          tag: 'p-spinner',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

