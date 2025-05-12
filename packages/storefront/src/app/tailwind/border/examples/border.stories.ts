'use client';

import type { Story } from '@/models/story';

export const borderRadiusStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-static-md' },
          children: ['.rounded-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-static-md' },
          children: ['.rounded-md'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-static-md' },
          children: ['.rounded-lg'],
        },
      ],
    },
  ],
};

export const borderWidthStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'border p-static-md' },
          children: ['.border'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-thin p-static-md',
          },
          children: ['.border-thin'],
        },
      ],
    },
  ],
};
