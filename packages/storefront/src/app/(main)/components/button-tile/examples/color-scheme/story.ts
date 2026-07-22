'use client';

import type { Story } from '@/models/story';

export const buttonTileStoryColorScheme: Story<'p-button-tile'> = {
  state: {
    properties: {
      label: 'Some label',
      description: 'Some Description',
      gradient: true,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-tile',
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
