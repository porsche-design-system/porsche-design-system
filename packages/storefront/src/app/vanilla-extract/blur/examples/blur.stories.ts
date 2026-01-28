'use client';

import type { Story } from '@/models/story';

export const blurVanillaExtractStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid prose-text-sm text-white',
      },
      children: [
        {
          tag: 'video',
          properties: {
            className: 'col-1 row-1 w-full h-full object-cover',
            loop: true,
            autoPlay: true,
            muted: true,
            playsInline: true,
          },
          children: [
            {
              tag: 'source',
              properties: { src: 'assets/mood-porsche-gts.mp4', type: 'video/mp4' },
            },
          ],
        },
        {
          tag: 'div',
          properties: {
            className:
              'backdrop-blur-frosted bg-frosted col-1 row-1 rounded-lg m-fluid-lg p-fluid-sm grid place-items-center',
          },
          children: ['...frostedGlassStyle'],
        },
      ],
    },
  ],
};
