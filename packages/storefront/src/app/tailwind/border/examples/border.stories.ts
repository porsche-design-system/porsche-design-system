'use client';

import type { Story } from '@/models/story';

export const borderStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-fluid-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: "border-b before:content-['.border']" },
        },
        {
          tag: 'div',
          properties: {
            className: "border-b-(length:--border-width-thin) before:content-['.border-(length:--border-width-thin)']",
          },
        },
        {
          tag: 'div',
          properties: {
            className: "border-b-(length:--border-width-base) before:content-['.border-(length:--border-width-base)']",
          },
        },
      ],
    },
  ],
};

export const borderRadiusStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-wrap gap-fluid-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'rounded-sm text-sm text-primary bg-background-surface p-fluid-md' },
          children: ['.rounded-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md text-sm text-primary bg-background-surface p-fluid-md' },
          children: ['.rounded-md'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg text-sm text-primary bg-background-surface p-fluid-md' },
          children: ['.rounded-lg'],
        },
      ],
    },
  ],
};
