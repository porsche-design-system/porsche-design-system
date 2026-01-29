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
          children: ['transition-duration: $motion-duration-sm;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-md transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $motion-duration-md;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-lg transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $motion-duration-lg;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-xl transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $motion-duration-xl;'],
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
              'ease-in-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $motion-ease-in-out;'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $motion-ease-in;'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $motion-ease-out;'],
        },
      ],
    },
  ],
};
