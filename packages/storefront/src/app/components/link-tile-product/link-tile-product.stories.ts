'use client';

import type { Story } from '@/models/story';

export const linkTileProductStory: Story<'p-link-tile-product'> = {
  state: {
    properties: {
      liked: false,
      heading: 'Some product',
      price: '718,00 €',
      priceOriginal: '911,00 €',
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
          eventType: 'LinkTileProductLikeEvent',
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

export const linkTileProductStoryFrameworkRouting: Story<'p-link-tile-product'> = {
  state: {
    properties: {
      liked: false,
      heading: 'Some product',
      price: '718,00 €',
      priceOriginal: '911,00 €',
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
          eventType: 'LinkTileProductLikeEvent',
          negateValue: true,
        },
      },
      children: [
        {
          tag: 'a',
          properties: {
            slot: 'anchor',
            href: 'https://porsche.com',
          },
          children: ['Weekender, sale price 718,00 €, original price ', { tag: 's', children: ['911,00 €'] }],
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
