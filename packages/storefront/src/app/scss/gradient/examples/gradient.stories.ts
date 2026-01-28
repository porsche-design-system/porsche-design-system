'use client';

import type { Story } from '@/models/story';

export const gradientScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm text-center text-white',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-t rounded-lg p-fluid-md',
          },
          children: ['@include pds-gradient-to-top;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-r rounded-lg p-fluid-md',
          },
          children: ['@include pds-gradient-to-right;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-b rounded-lg p-fluid-md',
          },
          children: ['@include pds-gradient-to-bottom;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-l rounded-lg p-fluid-md',
          },
          children: ['@include pds-gradient-to-left;'],
        },
      ],
    },
  ],
};
