'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const image: ElementConfig<HTMLTagOrComponent> = {
  tag: 'img',
  properties: {
    className: 'mt-static-sm',
    src: 'assets/model-series/911.webp',
    alt: 'Porsche 911',
    width: 640,
    height: 228,
  },
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className:
      '[--p-tile-gap-y:0] motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover]:shadow-sm',
    aspectRatio: 'auto',
    background: 'canvas',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['Porsche 911'] },
    { tag: 'p-model-signature', properties: { model: '911' } },
    { tag: 'p-text', children: ['Porsche 911'] },
    image,
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'article',
  properties: {
    className:
      'relative isolate flex flex-col items-center p-fluid-md rounded-3xl bg-canvas text-primary text-center motion-safe:transition-shadow duration-sm ease-in-out has-[a:hover]:shadow-sm',
  },
  children: [
    { tag: 'p-model-signature', properties: { model: '911' } },
    {
      tag: 'p-text',
      children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: ['Porsche 911'] }],
    },
    image,
  ],
};

export const tileStoryModelSelection: Story<'p-tile'> = {
  previewMaxWidth: '1136px',
  generator: () => [createComparison(tile, tailwindTile)],
};
