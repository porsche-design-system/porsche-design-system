'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const label = 'Weekender';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark [--p-tile-bg:#341f2e]',
    hoverEffect: 'zoom',
    aspectRatio: '16/9',
  },
  children: [
    {
      // `grow basis-0 min-h-0` fills the height of the `start` slot without increasing the height of the tile,
      // `object-contain` centers the image within it
      tag: 'img',
      properties: {
        slot: 'start',
        className: 'grow basis-0 min-h-0 w-full object-contain',
        src: 'assets/weekender.webp',
        alt: '',
        width: 960,
        height: 1080,
      },
    },
    {
      tag: 'div',
      properties: { className: 'self-stretch flex flex-col gap-static-sm text-start' },
      children: [
        { tag: 'p-heading', properties: { tag: 'h3', size: 'lg', hyphens: 'auto' }, children: [label] },
        {
          tag: 'p-text',
          properties: { color: 'contrast-high' },
          children: ['A timeless companion for short trips'],
        },
      ],
    },
    {
      // covers the tile, so the whole tile is clickable; it shows its own hover state whenever the tile is hovered;
      // placed in the `top` slot instead of a column of its own, so heading and text get the full width next to the
      // image on small viewports
      tag: 'p-link',
      properties: {
        slot: 'top',
        className: 'ms-auto',
        variant: 'secondary',
        icon: 'arrow-up-right',
        hideLabel: true,
        compact: true,
        cover: true,
      },
      children: [{ tag: 'a', properties: { href: '#' }, children: [label] }],
    },
  ],
};

export const tileStoryProductTeaser: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [tile],
};
