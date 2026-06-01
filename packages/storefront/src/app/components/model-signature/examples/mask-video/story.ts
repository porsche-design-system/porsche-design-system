'use client';

import type { Story } from '@/models/story';

export const modelSignatureStoryMaskVideo: Story<'p-model-signature'> = {
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
          tag: 'video',
          properties: {
            poster: 'assets/ocean.jpg',
            src: 'assets/ocean.mp4',
            autoPlay: true,
            playsInline: true,
            loop: true,
            muted: true,
          },
        },
      ],
    },
  ],
};

