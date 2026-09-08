'use client';

import type { Story } from '@/models/story';

export const linkTileStoryColorScheme: Story<'p-link-tile'> = {
  state: {
    properties: {
      href: 'https://porsche.com',
      label: 'Some label',
      description: 'Some Description',
      gradient: true,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-tile',
      properties,
      children: [
        {
          tag: 'p-tag',
          properties: {
            slot: 'header',
            color: 'background-frosted',
            compact: true,
            style: { colorScheme: 'only light' },
          },
          children: ['Some tag'],
        },
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
      ],
    },
  ],
};
