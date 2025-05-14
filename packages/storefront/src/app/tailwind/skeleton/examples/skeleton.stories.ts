'use client';

import type { Story } from '@/models/story';

export const skeletonStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col items-center justify-center gap-fluid-sm p-static-sm' },
      children: [
        {
          tag: 'div',
          properties: { className: 'skeleton h-[200px] w-full' },
          children: ['.skeleton'],
        },
        {
          tag: 'div',
          properties: { className: 'skeleton text-sm w-fit' },
          children: ['.skeleton .text-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'skeleton text-md w-fit' },
          children: ['.skeleton .text-md'],
        },
        {
          tag: 'div',
          properties: { className: 'skeleton text-lg w-fit' },
          children: ['.skeleton .text-lg'],
        },
      ],
    },
  ],
};
