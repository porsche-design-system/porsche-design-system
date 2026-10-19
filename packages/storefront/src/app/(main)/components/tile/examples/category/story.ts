'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';
import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';

const label = 'Vehicle Accessories';

const coverLinkProperties = {
  variant: 'secondary',
  icon: 'arrow-right',
  hideLabel: true,
  compact: true,
} as const;

const linkProperties = { ...coverLinkProperties, 'aria-hidden': 'true' } as const;

// slotted anchor, so the hidden link contains no focusable element
const linkChildren: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'a', properties: { href: '#', tabIndex: -1 }, children: [label] },
];

const imageProperties = {
  src: 'assets/products/roof-box-on-a-car.webp',
  alt: 'Porsche vehicle with roof box',
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: '[--p-tile-gap-y:var(--spacing-fluid-lg)] group',
    aspectRatio: '3/4',
    bleed: true,
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    {
      tag: 'p-heading',
      properties: { slot: 'top', tag: 'h3', size: 'md', weight: 'semibold' },
      children: [label],
    },
    {
      // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a redundant
      // link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own hover state and
      // triggers the zoom
      tag: 'p-link',
      properties: { slot: 'top', className: 'ms-auto pointer-events-auto', ...linkProperties },
      children: linkChildren,
    },
    {
      tag: 'img',
      properties: {
        className:
          'object-top motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:scale-105',
        ...imageProperties,
      },
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // the outer element is the positioning context of the stretched link and carries the radius, the inner element lays
  // out the content and clips the image to the radius
  tag: 'article',
  properties: { className: 'group relative isolate grid aspect-[3/4] rounded-3xl bg-surface text-primary' },
  children: [
    {
      tag: 'div',
      properties: { className: 'min-w-0 flex flex-col gap-fluid-lg p-fluid-md overflow-clip rounded-[inherit]' },
      children: [
        {
          tag: 'div',
          properties: { className: 'flex items-center gap-fluid-sm' },
          children: [
            {
              tag: 'p-heading',
              properties: { tag: 'h3', size: 'md', weight: 'semibold' },
              children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [label] }],
            },
            {
              // visual duplicate of the stretched link, hidden from assistive technology and keyboard to avoid a
              // redundant link; `relative z-2` places it above the stretched link, so it shows its own hover state
              tag: 'p-link',
              properties: { className: 'relative z-2 ms-auto', ...linkProperties },
              children: linkChildren,
            },
          ],
        },
        {
          // negative margins equal to the padding let the image bleed to the edges, the parent clips it to the radius
          tag: 'img',
          properties: {
            className:
              'grow basis-0 min-h-0 self-stretch max-w-none -mb-fluid-md -mx-fluid-md object-cover object-top motion-safe:transition-transform duration-md ease-in-out group-has-[a:hover]:scale-105',
            ...imageProperties,
          },
        },
      ],
    },
  ],
};

const coverTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: '[--p-tile-gap-y:var(--spacing-fluid-lg)] group',
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
      // covers the tile instead of the `anchor` slot, so the visible link is the only one and needs no duplicate; it
      // shows its own hover state whenever the tile is hovered
      tag: 'p-link',
      properties: { slot: 'top', className: 'ms-auto', cover: true, ...coverLinkProperties },
      children: [{ tag: 'a', properties: { href: '#' }, children: [label] }],
    },
    {
      tag: 'img',
      properties: {
        className:
          'object-top motion-safe:transition-transform duration-md ease-in-out group-has-[p-link:hover]:scale-105',
        ...imageProperties,
      },
    },
  ],
};

export const tileStoryCategory: Story<'p-tile'> = {
  previewMaxWidth: '816px',
  generator: () => [createComparison(tile, tailwindTile, { coverTile })],
};
