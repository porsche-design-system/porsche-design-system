'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
