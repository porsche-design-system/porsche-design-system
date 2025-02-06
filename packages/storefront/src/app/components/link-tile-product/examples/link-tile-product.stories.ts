'use client';

import type { Story } from '@/models/story';

export const linkTileProductStory: Story<'p-link-tile-product'> = {
  state: {
    properties: {
      heading: 'Some product',
      price: '1.911,00 €',
      description: 'Some description',
      href: 'https://porsche.com',
    },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'p-link-tile-product',
      properties: { ...properties, onLike: (e) => updateState?.('p-link-tile-product', 'liked', !e.detail.liked) },
      children: [
        {
          tag: 'p-tag',
          properties: {
            slot: 'header',
            color: 'background-base',
          },
          children: ['New'],
        },
        {
          tag: 'img',
          properties: {
            src: 'assets/placeholder_800x900.svg',
            width: 800,
            height: 900,
            alt: 'Some alt text',
          },
        },
      ],
    },
  ],
};
