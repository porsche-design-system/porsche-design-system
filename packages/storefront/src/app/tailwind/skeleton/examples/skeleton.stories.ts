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
          properties: { className: 'pds-skeleton h-[200px] w-full' },
          children: ['.pds-skeleton'],
        },
        {
          tag: 'div',
          properties: { className: 'pds-skeleton text-sm w-fit' },
          children: ['.pds-skeleton .text-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'pds-skeleton text-md w-fit' },
          children: ['.pds-skeleton .text-md'],
        },
        {
          tag: 'div',
          properties: { className: 'pds-skeleton text-lg w-fit' },
          children: ['.pds-skeleton .text-lg'],
        },
      ],
    },
  ],
};
