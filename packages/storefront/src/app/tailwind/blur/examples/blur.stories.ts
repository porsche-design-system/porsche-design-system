'use client';

import type { Story } from '@/models/story';

export const blurStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid',
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
              'backdrop-blur-frosted bg-background-frosted col-1 row-1 rounded-lg m-fluid-lg p-static-md text-primary-dark grid place-items-center',
          },
          children: ['.backdrop-blur-frosted .bg-background-frosted'],
        },
      ],
    },
  ],
};
