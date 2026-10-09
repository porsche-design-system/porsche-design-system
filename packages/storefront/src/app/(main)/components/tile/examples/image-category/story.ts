'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const label = '911';

const linkProperties = {
  variant: 'secondary',
  icon: 'arrow-right',
  hideLabel: true,
  compact: true,
  'aria-hidden': 'true',
} as const;

// slotted anchor, so the hidden link contains no focusable element
const linkChildren: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'a', properties: { href: '#', tabIndex: -1 }, children: [label] },
];

const imageProperties = {
  src: 'assets/porsche-992-carrera-s.jpg',
  alt: 'Porsche 992 Carrera S',
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark group',
    aspectRatio: '1/1',
    gradient: 'bottom',
  },
  children: [
    {
      tag: 'img',
      properties: {
        slot: 'background',
        className:
          'motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:scale-105',
        ...imageProperties,
      },
    },
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    {
      tag: 'p-heading',
      properties: { slot: 'bottom', tag: 'h3', size: 'md', weight: 'semibold' },
      children: [label],
    },
    {
      // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a redundant
      // link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own hover state and
      // triggers the zoom
      tag: 'p-link',
      properties: { slot: 'bottom', className: 'ms-auto pointer-events-auto', ...linkProperties },
      children: linkChildren,
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'article',
  properties: {
    className: 'scheme-dark group relative isolate grid grid-rows-[1fr_auto] aspect-square rounded-3xl text-primary',
  },
  children: [
    {
      // background behind the content, clips the zooming image to the radius
      tag: 'div',
      properties: { className: 'absolute inset-0 -z-1 overflow-clip rounded-[inherit] bg-canvas' },
      children: [
        {
          tag: 'img',
          properties: {
            className:
              'size-full object-cover motion-safe:transition-transform duration-md ease-in-out group-has-[a:hover]:scale-105',
            ...imageProperties,
          },
        },
      ],
    },
    {
      // the gradient extends above the content via the top padding to ensure the legibility of the heading
      tag: 'div',
      properties: {
        className: 'row-start-2 flex items-center gap-fluid-sm p-fluid-md pt-fluid-lg bg-fade-to-t rounded-b-[inherit]',
      },
      children: [
        {
          tag: 'p-heading',
          properties: { tag: 'h3', size: 'md', weight: 'semibold' },
          children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [label] }],
        },
        {
          // visual duplicate of the stretched link, hidden from assistive technology and keyboard to avoid a redundant
          // link; `relative z-2` places it above the stretched link, so it shows its own hover state
          tag: 'p-link',
          properties: { className: 'relative z-2 ms-auto', ...linkProperties },
          children: linkChildren,
        },
      ],
    },
  ],
};

export const tileStoryImageCategory: Story<'p-tile'> = {
  previewMaxWidth: '816px',
  generator: () => [createComparison(tile, tailwindTile)],
};
