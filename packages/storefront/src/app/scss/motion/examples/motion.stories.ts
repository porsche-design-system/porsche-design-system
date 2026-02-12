'use client';

import type { Story } from '@/models/story';

export const motionScssStoryDuration: Story<'div'> = {
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
            className: 'duration-sm transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $duration-sm;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-md transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $duration-md;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-lg transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $duration-lg;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-xl transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $duration-xl;'],
        },
      ],
    },
  ],
};

export const motionScssStoryEase: Story<'div'> = {
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
            className:
              'ease-in-out transition-transform duration-xl transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $ease-in-out;'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition-transform duration-xl transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $ease-in;'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition-transform duration-xl transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $ease-out;'],
        },
      ],
    },
  ],
};
