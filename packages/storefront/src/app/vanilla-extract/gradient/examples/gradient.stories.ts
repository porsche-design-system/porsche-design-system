'use client';

import type { Story } from '@/models/story';

export const gradientVanillaExtractStory: Story<'div'> = {
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
          children: ['...gradientToTopStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-r rounded-lg p-fluid-md',
          },
          children: ['...gradientToRightStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-b rounded-lg p-fluid-md',
          },
          children: ['...gradientToBottomStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-l rounded-lg p-fluid-md',
          },
          children: ['...gradientToLeftStyle'],
        },
      ],
    },
  ],
};
