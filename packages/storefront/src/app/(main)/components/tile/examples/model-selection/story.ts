'use client';

import type { Story } from '@/models/story';

export const tileStoryModelSelection: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        className:
          '[--p-tile-gap-y:0] motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover]:shadow-sm',
        aspectRatio: 'auto',
        background: 'canvas',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['Porsche 911'] },
        { tag: 'p-model-signature', properties: { model: '911' } },
        { tag: 'p-text', children: ['Porsche 911'] },
        {
          tag: 'img',
          properties: {
            className: 'mt-static-sm',
            src: 'assets/model-series/911.webp',
            alt: 'Porsche 911',
            width: 640,
            height: 228,
          },
        },
      ],
    },
  ],
};
