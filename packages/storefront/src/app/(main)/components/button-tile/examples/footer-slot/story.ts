'use client';

import type { Story } from '@/models/story';

export const buttonTileStoryFooterSlot: Story<'p-button-tile'> = {
  state: {
    properties: { label: 'Some label', description: 'Some Description' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        {
          tag: 'p-button-tile',
          properties,
          children: [
            {
              tag: 'p-tag',
              properties: { slot: 'header', color: 'background-frosted', compact: true },
              children: ['Some tag'],
            },
            { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
            { tag: 'p-text', properties: { slot: 'footer' }, children: ['Some footer text'] },
          ],
        },
        {
          tag: 'p-button-tile',
          properties: { ...properties, compact: true },
          children: [
            {
              tag: 'p-tag',
              properties: { slot: 'header', color: 'background-frosted', compact: true },
              children: ['Some tag'],
            },
            { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
            { tag: 'p-text', properties: { slot: 'footer' }, children: ['Some footer text'] },
          ],
        },
      ],
    },
  ],
};

