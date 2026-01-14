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
            className: 'shadow-low rounded-lg p-fluid-sm',
          },
          children: ['@include pds-drop-shadow-low;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-medium rounded-lg p-fluid-sm',
          },
          children: ['@include pds-drop-shadow-medium;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-high rounded-lg p-fluid-sm',
          },
          children: ['@include pds-drop-shadow-high;'],
        },
      ],
    },
  ],
};
