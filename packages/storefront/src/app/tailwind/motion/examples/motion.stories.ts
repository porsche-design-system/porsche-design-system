'use client';

import type { Story } from '@/models/story';

export const motionStoryDuration: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-fluid-md p-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'duration-short transition transform hover:scale-120 rounded-lg bg-surface p-fluid-md',
          },
          children: ['.duration-short'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-moderate transition transform hover:scale-120 rounded-lg bg-surface p-fluid-md',
          },
          children: ['.duration-moderate'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-long transition transform hover:scale-120 rounded-lg bg-surface p-fluid-md',
          },
          children: ['.duration-long'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-very-long transition transform hover:scale-120 rounded-lg bg-surface p-fluid-md',
          },
          children: ['.duration-very-long'],
        },
      ],
    },
  ],
};

export const motionStoryEasing: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-fluid-md p-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className:
              'ease-in-out transition duration-very-long transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-in-out'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition duration-very-long transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-in'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition duration-very-long transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-out'],
        },
      ],
    },
  ],
};
