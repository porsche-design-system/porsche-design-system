'use client';

import type { Story } from '@/models/story';

export const linkTileStoryFooterSlot: Story<'p-link-tile'> = {
  state: {
    properties: {
      href: 'https://porsche.com',
      label: 'Some label',
      description: 'Some Description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        {
          tag: 'p-link-tile',
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
          tag: 'p-link-tile',
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

