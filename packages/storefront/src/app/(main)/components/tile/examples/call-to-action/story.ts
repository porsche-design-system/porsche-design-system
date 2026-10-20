'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark has-[p-link:hover]:[--p-tile-media-scale:1.05]',
    aspectRatio: '16/9',
    gradient: 'start',
  },
  children: [
    { tag: 'img', properties: { slot: 'background', src: 'assets/dessert.jpg', alt: '' } },
    { tag: 'p-heading', properties: { slot: 'start', tag: 'h3', size: 'lg' }, children: ['Porsche Connect.'] },
    {
      tag: 'p-text',
      properties: { slot: 'start' },
      children: [
        'Porsche Connect enhances the driving experience with a wide range of music and video streaming services, the integrated Voice Pilot and remote services via the My Porsche app.',
      ],
    },
    {
      // covers the tile, so the whole tile is clickable; it shows its own hover state whenever the tile is hovered
      tag: 'p-link',
      properties: { slot: 'start', className: 'mt-fluid-sm', variant: 'secondary', cover: true },
      children: [{ tag: 'a', properties: { href: '#' }, children: ['Discover Porsche Connect'] }],
    },
  ],
};

export const tileStoryCallToAction: Story<'p-tile'> = {
  generator: () => [tile],
};
