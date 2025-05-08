'use client';

import type { Story } from '@/models/story';

export const blurStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'relative h-30',
      },
      children: [
        {
          tag: 'video',
          properties: {
            className: 'absolute inset-0 w-full h-full object-cover',
            loop: true,
            autoPlay: true,
            muted: true,
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
              'backdrop-blur-frosted-glass bg-background-frosted absolute inset-0 flex items-center justify-center text-primary-dark rounded-lg m-static-md',
          },
          children: ['.backdrop-blur-frosted-glass'],
        },
      ],
    },
  ],
};
