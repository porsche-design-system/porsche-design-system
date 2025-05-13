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
            className:
              'transition duration-(--pds-duration-short) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.duration-(--pds-duration-short)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'transition duration-(--pds-duration-moderate) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.duration-(--pds-duration-moderate)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'transition duration-(--pds-duration-long) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.duration-(--pds-duration-long)'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'transition duration-(--pds-duration-very-long) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.duration-(--pds-duration-very-long)'],
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
              'ease-base transition duration-(--pds-duration-very-long) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-base'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition duration-(--pds-duration-very-long) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-in'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition duration-(--pds-duration-very-long) transform hover:scale-120 rounded-lg text-sm text-primary bg-surface p-fluid-md',
          },
          children: ['.ease-out'],
        },
      ],
    },
  ],
};
