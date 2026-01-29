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
            className: 'duration-sm transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-sm'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-md transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-md'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-lg transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-lg'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-xl transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['.duration-xl'],
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
