'use client';

import type { Story } from '@/models/story';

const href = 'https://finder.porsche.com/de/de-DE/search/911?model=911';
const name = 'Porsche 911';

export const tileStoryModelSelection: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: 'auto',
        background: 'canvas',
        className:
          '[--p-tile-gap-y:0] motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover]:shadow-sm',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href }, children: [name] },
        { tag: 'p-model-signature', properties: { model: '911' } },
        { tag: 'p-text', children: [name] },
        {
          tag: 'img',
          properties: {
            className: 'mt-static-sm',
            src: 'assets/model-series/911.webp',
            alt: 'Porsche 911',
            width: 776,
            height: 276,
          },
        },
      ],
    },
  ],
};
