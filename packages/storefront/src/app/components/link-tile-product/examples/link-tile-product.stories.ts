'use client';

import type { Story } from '@/models/story';

export const linkTileProductStory: Story<'p-link-tile-product'> = {
  state: {
    properties: {
      liked: false,
      heading: 'Some product',
      price: '1.911,00 €',
      description: 'Some description',
      href: 'https://porsche.com',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-tile-product',
      properties,
      events: {
        // @ts-ignore
        onLike: {
          target: 'p-link-tile-product',
          prop: 'liked',
          eventValueKey: 'liked',
          eventType: 'CustomEvent<LinkTileProductLikeEvent>',
          negateValue: true,
        },
      },
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
