'use client';

import type { Story } from '@/models/story';

export const skeletonVanillaExtractStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'grid gap-fluid-sm prose-text-sm' },
      children: [
        {
          tag: 'span',
          properties: { className: 'skeleton p-fluid-sm' },
          children: [
            { tag: 'p', children: ['const skeletonAnimation = keyframes(skeletonKeyframes);'] },
            {
              tag: 'p',
              children: ["const Skeleton = style(getSkeletonStyle(skeletonAnimation, { theme: 'light|dark|auto' }));"],
            },
          ],
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
