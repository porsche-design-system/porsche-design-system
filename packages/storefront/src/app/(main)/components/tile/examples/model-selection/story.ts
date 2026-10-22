'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: '[--p-tile-gap-y:0]',
    aspectRatio: 'auto',
    hoverEffect: 'zoom',
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
};

export const tileStoryModelSelection: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [tile],
};
