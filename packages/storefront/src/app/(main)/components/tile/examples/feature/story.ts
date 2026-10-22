'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    aspectRatio: 'auto',
    bleed: true,
  },
  children: [
    {
      // `bleed` lets the image reach the top and side edges of the tile, the tile clips it to its corner radius
      tag: 'img',
      properties: {
        className: 'aspect-video',
        src: 'assets/porsche-992-carrera-s.jpg',
        alt: 'Rear view of a Porsche 911 Carrera S',
      },
    },
    {
      tag: 'div',
      properties: { slot: 'bottom', className: 'grow flex flex-col gap-fluid-sm' },
      children: [
        {
          tag: 'p-heading',
          properties: { tag: 'h3', size: 'lg' },
          children: ['Rear-axle steering.', { tag: 'sup', children: ['1'] }],
        },
        {
          tag: 'p-text',
          children: [
            'Increases performance and everyday usability: at low speeds, the turning circle is reduced, agility is increased and parking is made easier. At higher speeds, driving stability is increased.',
          ],
        },
        {
          tag: 'p-text',
          properties: { className: 'mt-fluid-sm', size: 'xs', color: 'contrast-medium' },
          children: [{ tag: 'sup', children: ['1'] }, 'Optionally available.'],
        },
      ],
    },
  ],
};

export const tileStoryFeature: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [tile],
};
