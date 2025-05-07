'use client';

import type { Story } from '@/models/story';

export const shadowStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'shadow-low rounded-lg text-sm text-primary p-fluid-md',
          },
          children: ['.shadow-low'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-medium rounded-lg text-sm text-primary p-fluid-md',
          },
          children: ['.shadow-medium'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-high rounded-lg text-sm text-primary p-fluid-md',
          },
          children: ['.shadow-high'],
        },
      ],
    },
  ],
};
