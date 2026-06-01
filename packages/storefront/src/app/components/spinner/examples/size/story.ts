'use client';

import type { Story } from '@/models/story';

export const spinnerStorySize: Story<'p-spinner'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      size: 'inherit',
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        className: 'text-[48px]',
        size: 'inherit',
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

