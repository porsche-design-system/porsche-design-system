'use client';

import type { Story } from '@/models/story';

export const gradientScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm text-center text-white',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-t rounded-lg p-fluid-md',
          },
          children: ['background: linear-gradient(to top, $gradient-stops-fade-dark);'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-r rounded-lg p-fluid-md',
          },
          children: ['background: linear-gradient(to right, $gradient-stops-fade-dark);'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-b rounded-lg p-fluid-md',
          },
          children: ['background: linear-gradient(to bottom, $gradient-stops-fade-dark);'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-l rounded-lg p-fluid-md',
          },
          children: ['background: linear-gradient(to left, $gradient-stops-fade-dark);'],
        },
      ],
    },
  ],
};
