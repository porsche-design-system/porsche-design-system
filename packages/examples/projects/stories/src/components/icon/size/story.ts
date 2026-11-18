'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const iconStorySize: Story<'p-icon'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      size: 'inherit',
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: { className: 'text-[48px]', size: 'inherit' },
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
