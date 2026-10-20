'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const label = 'Weekender';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark [--p-tile-bg:#341f2e] has-[p-link:hover]:[--p-tile-media-scale:1.05]',
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
      // `mb-auto` aligns it to the top of the `end` slot
      tag: 'p-link',
      properties: {
        slot: 'end',
        className: 'mb-auto',
        variant: 'secondary',
        icon: 'arrow-up-right',
        hideLabel: true,
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
