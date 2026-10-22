'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const label = 'Vehicle Accessories';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: '[--p-tile-gap-y:var(--spacing-fluid-lg)]',
    hoverEffect: 'zoom',
    aspectRatio: '3/4',
    bleed: true,
  },
  children: [
    {
      tag: 'p-heading',
      properties: { slot: 'top', tag: 'h3', size: 'md', weight: 'semibold' },
      children: [label],
    },
    {
      // covers the tile, so the whole tile is clickable; it shows its own hover state whenever the tile is hovered
      tag: 'p-link',
      properties: {
        slot: 'top',
        className: 'ms-auto',
        variant: 'secondary',
        icon: 'arrow-right',
        hideLabel: true,
        compact: true,
        cover: true,
      },
      children: [{ tag: 'a', properties: { href: '#' }, children: [label] }],
    },
    {
      // the cut-out image starts at the top of its box, `[clip-path:none]` lets it grow beyond the box on zoom instead of
      // being clipped at an invisible edge
      tag: 'img',
      properties: {
        className: 'object-top [clip-path:none]',
        src: 'assets/products/roof-box-on-a-car.webp',
        alt: 'Porsche vehicle with roof box',
      },
    },
  ],
};

export const tileStoryCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [tile],
};
