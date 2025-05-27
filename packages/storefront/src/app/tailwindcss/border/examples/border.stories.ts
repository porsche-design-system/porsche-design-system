'use client';

import type { Story } from '@/models/story';

export const borderRadiusStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-sm' },
          children: ['.rounded-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-sm' },
          children: ['.rounded-md'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-sm' },
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
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'border p-fluid-sm' },
          children: ['.border'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-thin p-fluid-sm',
          },
          children: ['.border-thin'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-regular p-fluid-sm',
          },
          children: ['.border-regular'],
        },
      ],
    },
  ],
};
