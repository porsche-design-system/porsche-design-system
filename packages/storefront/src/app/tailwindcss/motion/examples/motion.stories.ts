'use client';

import type { Story } from '@/models/story';

export const motionStoryDuration: Story<'div'> = {
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
          children: ['.duration-short'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-moderate transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-moderate'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-long'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-very-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-very-long'],
        },
      ],
    },
  ],
};

export const motionStoryEase: Story<'div'> = {
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
          children: ['.ease-in-out'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.ease-in'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.ease-out'],
        },
      ],
    },
  ],
};
