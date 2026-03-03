'use client';

import type { Story } from '@/models/story';

export const shadowScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'shadow-sm rounded-lg p-fluid-sm',
          },
          children: ['box-shadow: $shadow-sm;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-md rounded-lg p-fluid-sm',
          },
          children: ['box-shadow: $shadow-md;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-lg rounded-lg p-fluid-sm',
          },
          children: ['box-shadow: $shadow-lg;'],
        },
      ],
    },
  ],
};
