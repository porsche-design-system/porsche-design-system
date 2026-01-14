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
            className: 'duration-short transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $pds-motion-duration-short'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-moderate transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $pds-motion-duration-moderate'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $pds-motion-duration-long'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-very-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-duration: $pds-motion-duration-very-long'],
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
          children: ['transition-timing-function: $pds-motion-easing-base'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $pds-motion-easing-in'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transition-timing-function: $pds-motion-easing-out'],
        },
      ],
    },
  ],
};
