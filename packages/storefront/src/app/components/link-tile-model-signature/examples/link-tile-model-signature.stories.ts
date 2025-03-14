'use client';

import type { Story } from '@/models/story';

export const linkTileModelSignatureStory: Story<'p-link-tile-model-signature'> = {
  state: {
    properties: { heading: 'Some heading' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-tile-model-signature',
      properties,
      children: [
        {
          tag: 'p-tag',
          properties: { slot: 'header', color: 'background-frosted', compact: true },
          children: ['Some tag'],
        },
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        {
          tag: 'p-link',
          properties: { slot: 'primary', href: 'https://porsche.com/#primary' },
          children: ['Primary label'],
        },
        {
          tag: 'p-link',
          properties: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
          children: ['Secondary label'],
        },
      ],
    },
  ],
};
