'use client';

import type { Story } from '@/models/story';

export const skeletonEmotionStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'grid gap-fluid-sm prose-text-sm' },
      children: [
        {
          tag: 'span',
          properties: { className: 'skeleton p-fluid-sm' },
          children: ["getSkeletonStyle({ theme: 'light|dark|auto' })"],
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-4/5 h-fluid-sm rounded-sm' },
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-4/5 h-fluid-sm rounded-sm' },
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-3/5 h-fluid-sm rounded-sm' },
        },
      ],
    },
  ],
};
