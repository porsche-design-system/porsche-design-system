'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const label = 'Weekender';

const linkProperties = {
  variant: 'secondary',
  icon: 'arrow-up-right',
  hideLabel: true,
  'aria-hidden': 'true',
} as const;

// slotted anchor, so the hidden link contains no focusable element
const linkChildren: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'a', properties: { href: '#', tabIndex: -1 }, children: [label] },
];

const createImage = (className: string, slot?: 'start'): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'img',
  properties: {
    ...(slot && { slot }),
    className: `w-full object-contain motion-safe:transition-transform duration-md ease-in-out ${className}`,
    src: 'assets/weekender.webp',
    alt: '',
    width: 960,
    height: 1080,
  },
});

const description: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-text',
  properties: { color: 'contrast-high' },
  children: ['A timeless companion for short trips'],
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark group [--p-tile-bg:#341f2e]',
    aspectRatio: '16/9',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    // `grow basis-0 min-h-0` fills the height of the `start` slot without increasing the height of the tile,
    // `object-contain` centers the image within it
    createImage('grow basis-0 min-h-0 group-has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:scale-105', 'start'),
    {
      tag: 'div',
      properties: { className: 'self-stretch flex flex-col gap-static-sm text-start' },
      children: [
        { tag: 'p-heading', properties: { tag: 'h3', size: 'lg', hyphens: 'auto' }, children: [label] },
        description,
      ],
    },
    {
      // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a redundant
      // link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own hover state and
      // triggers the zoom; `mb-auto` aligns it to the top of the `end` slot
      tag: 'p-link',
      properties: { slot: 'end', className: 'mb-auto pointer-events-auto', ...linkProperties },
      children: linkChildren,
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // the outer element is the positioning context of the stretched link and carries the radius, the inner element lays
  // out the content and clips the image to the radius
  tag: 'article',
  properties: {
    className: 'scheme-dark group relative isolate grid aspect-video rounded-3xl bg-[#341f2e] text-primary',
  },
  children: [
    {
      // the columns mirror the `start`, default and `end` slots, `minmax(0,1fr)` keeps the image from increasing the
      // height of the tile
      tag: 'div',
      properties: {
        className:
          'min-w-0 grid grid-cols-[fit-content(50%)_minmax(0,1fr)_fit-content(50%)] grid-rows-[minmax(0,1fr)] gap-fluid-sm p-fluid-md overflow-clip rounded-[inherit]',
      },
      children: [
        {
          // mirrors the `start` slot, a flex column in which the image fills the height via `grow basis-0 min-h-0`
          tag: 'div',
          properties: { className: 'flex flex-col' },
          children: [createImage('grow basis-0 min-h-0 group-has-[a:hover]:scale-105')],
        },
        {
          tag: 'div',
          properties: { className: 'flex flex-col justify-center gap-static-sm' },
          children: [
            {
              tag: 'p-heading',
              properties: { tag: 'h3', size: 'lg', hyphens: 'auto' },
              children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [label] }],
            },
            description,
          ],
        },
        {
          // visual duplicate of the stretched link, hidden from assistive technology and keyboard to avoid a redundant
          // link; `relative z-2` places it above the stretched link, so it shows its own hover state
          tag: 'p-link',
          properties: { className: 'relative z-2 self-start', ...linkProperties },
          children: linkChildren,
        },
      ],
    },
  ],
};

export const tileStoryProductTeaser: Story<'p-tile'> = {
  generator: () => [createComparison(tile, tailwindTile)],
};
