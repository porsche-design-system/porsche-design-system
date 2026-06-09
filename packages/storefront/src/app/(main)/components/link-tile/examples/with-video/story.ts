'use client';

import type { Story } from '@/models/story';

export const linkTileStoryVideo: Story<'p-link-tile'> = {
  state: {
    properties: {
      href: 'https://porsche.com',
      label: 'Some label',
      description: 'Some Description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-tile',
      properties,
      children: [
        {
          tag: 'p-tag',
          properties: { slot: 'header', color: 'background-frosted', compact: true },
          children: ['Some tag'],
        },
        {
          tag: 'video',
          properties: {
            poster: 'assets/ocean.jpg',
            src: 'assets/ocean.mp4',
            loop: true,
            muted: true,
            autoPlay: true,
            'aria-label': 'Some video description',
          },
        },
      ],
    },
  ],
};

