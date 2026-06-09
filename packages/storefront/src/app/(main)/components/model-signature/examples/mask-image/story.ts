'use client';

import type { Story } from '@/models/story';

export const modelSignatureStoryMaskImage: Story<'p-model-signature'> = {
  state: {
    properties: {
      safeZone: false,
      className: '[--p-model-signature-width:auto]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
      children: [
        {
          tag: 'img',
          properties: { src: 'assets/dessert.jpg', alt: 'Dessert' },
        },
      ],
    },
  ],
};

