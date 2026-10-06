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
        className:
          'rounded-3xl motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover]:shadow-sm',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href }, children: [name] },
        { tag: 'p-model-signature', properties: { model: '911' } },
        { tag: 'p-text', properties: { size: 'md' }, children: [name] },
        { tag: 'img', properties: { src: 'assets/911.png', alt: '', width: 271, height: 96 } },
      ],
    },
  ],
};
