'use client';

import type { Story } from '@/models/story';

export const iconStoryColor: Story<'p-icon'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      color: 'inherit',
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
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
          tag: 'p-icon',
          properties,
        },
        'Some text',
      ],
    },
  ],
};


