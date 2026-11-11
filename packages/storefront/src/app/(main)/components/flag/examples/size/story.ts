'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const flagStorySize: Story<'p-flag'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      size: 'inherit',
      name: 'de',
      aria: { 'aria-label': 'Flag of Germany' },
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
          tag: 'p-flag',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

