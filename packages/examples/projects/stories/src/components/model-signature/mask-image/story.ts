'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
