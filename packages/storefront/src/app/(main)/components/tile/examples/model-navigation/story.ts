'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    hoverEffect: 'offset highlight',
    aspectRatio: '16/9',
    background: 'none',
    compact: true,
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['718'] },
    { tag: 'p-heading', properties: { slot: 'top', tag: 'h3', size: 'md' }, children: ['718'] },
    {
      tag: 'img',
      properties: {
        // reserves the space the tile moves the image into on hover
        className: 'pe-static-md',
        src: 'assets/model-series/718.webp',
        alt: 'Porsche 718',
        width: 640,
        height: 228,
      },
    },
    { tag: 'p-tag', properties: { slot: 'bottom' }, children: ['Petrol'] },
  ],
};

export const tileStoryModelNavigation: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [tile],
};
