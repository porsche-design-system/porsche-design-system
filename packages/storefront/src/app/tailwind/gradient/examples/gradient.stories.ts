'use client';

import type { Story } from '@/models/story';

export const gradientStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm text-center text-primary-dark',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-t rounded-lg p-fluid-md',
          },
          children: ['.bg-fade-to-t'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-r rounded-lg p-fluid-md',
          },
          children: ['.bg-fade-to-r'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-b rounded-lg p-fluid-md',
          },
          children: ['.bg-fade-to-b'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-l rounded-lg p-fluid-md',
          },
          children: ['.bg-fade-to-l'],
        },
      ],
    },
  ],
};
