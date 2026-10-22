'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const label = '911';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark',
    hoverEffect: 'zoom',
    aspectRatio: '1/1',
    gradient: 'bottom',
  },
  children: [
    {
      tag: 'img',
      properties: { slot: 'background', src: 'assets/porsche-992-carrera-s.jpg', alt: 'Porsche 992 Carrera S' },
    },
    {
      tag: 'p-heading',
      properties: { slot: 'bottom', tag: 'h3', size: 'md', weight: 'semibold' },
      children: [label],
    },
    {
      // covers the tile, so the whole tile is clickable; it shows its own hover state whenever the tile is hovered
      tag: 'p-link',
      properties: {
        slot: 'bottom',
        className: 'ms-auto',
        variant: 'secondary',
        icon: 'arrow-right',
        hideLabel: true,
        compact: true,
        cover: true,
      },
      children: [{ tag: 'a', properties: { href: '#' }, children: [label] }],
    },
  ],
};

export const tileStoryImageCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [tile],
};
