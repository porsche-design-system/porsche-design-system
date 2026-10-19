'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';
import { createComparison } from '@/app/(main)/components/tile/examples/comparison';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const imageProperties = {
  src: 'assets/porsche-992-carrera-s.jpg',
  alt: 'Rear view of a Porsche 911 Carrera S',
};

const text: Children = [
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
];

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: '[--p-tile-gap-y:var(--spacing-fluid-md)]',
    aspectRatio: 'auto',
    bleed: true,
  },
  children: [
    {
      // `bleed` lets the image reach the top and side edges of the tile, the tile clips it to its corner radius
      tag: 'img',
      properties: { className: 'aspect-video', ...imageProperties },
    },
    {
      tag: 'div',
      properties: { slot: 'bottom', className: 'grow flex flex-col gap-fluid-sm' },
      children: text,
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // without stretched link, the tile itself can clip the image to the radius
  tag: 'div',
  properties: {
    className: 'flex flex-col gap-fluid-md p-fluid-md overflow-clip rounded-3xl bg-surface text-primary',
  },
  children: [
    {
      // negative margins equal to the padding let the image bleed to the edges, the parent clips it to the radius
      tag: 'img',
      properties: {
        className: 'self-stretch max-w-none -mt-fluid-md -mx-fluid-md aspect-video object-cover',
        ...imageProperties,
      },
    },
    {
      tag: 'div',
      properties: { className: 'flex flex-col gap-fluid-sm' },
      children: text,
    },
  ],
};

export const tileStoryFeature: Story<'p-tile'> = {
  previewMaxWidth: '1136px',
  generator: () => [createComparison(tile, tailwindTile)],
};
