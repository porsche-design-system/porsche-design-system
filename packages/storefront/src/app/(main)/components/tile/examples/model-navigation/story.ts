'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const imageProperties = {
  src: 'assets/model-series/718.webp',
  alt: 'Porsche 718',
  width: 640,
  height: 228,
};

const imageMotionClassName =
  'pe-static-md motion-safe:transition-transform duration-sm ease-in-out group-has-[a:hover]:translate-x-static-md';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'group motion-safe:transition-colors duration-sm ease-in-out has-[[slot=anchor]:hover]:bg-canvas',
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
        className:
          'pe-static-md motion-safe:transition-transform duration-sm ease-in-out group-has-[[slot=anchor]:hover]:translate-x-static-md',
        ...imageProperties,
      },
    },
    { tag: 'p-tag', properties: { slot: 'bottom' }, children: ['Petrol'] },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // the rows mirror the `top`, default and `bottom` slots, padding and gap match `compact`
  tag: 'article',
  properties: {
    className:
      'group relative isolate grid grid-rows-[auto_1fr_auto] gap-fluid-xs p-fluid-sm aspect-video rounded-3xl text-primary motion-safe:transition-colors duration-sm ease-in-out has-[a:hover]:bg-canvas',
  },
  children: [
    {
      tag: 'p-heading',
      properties: { tag: 'h3', size: 'md' },
      children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: ['718'] }],
    },
    { tag: 'img', properties: { className: `place-self-center ${imageMotionClassName}`, ...imageProperties } },
    { tag: 'p-tag', properties: { className: 'justify-self-start' }, children: ['Petrol'] },
  ],
};

export const tileStoryModelNavigation: Story<'p-tile'> = {
  previewMaxWidth: '1136px',
  generator: () => [createComparison(tile, tailwindTile)],
};
