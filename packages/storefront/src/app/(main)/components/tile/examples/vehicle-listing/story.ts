'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const createText = (text: string): ElementConfig<HTMLTagOrComponent> => ({ tag: 'p-text', children: [text] });

const createDetails = (heading: ElementConfig<HTMLTagOrComponent>, actions: Children): Children => [
  heading,
  createText('Porsche Approved Pre-owned'),
  { tag: 'p-divider' },
  createText('White · Black'),
  createText('Petrol · 58,540 km · 04/2017 · 2 previous owners · Accident-free'),
  createText('220 kW / 300 PS · Rear-wheel drive · Manual'),
  { tag: 'p-divider' },
  { tag: 'p-text', properties: { size: 'md' }, children: ['€159,900'] },
  {
    tag: 'div',
    properties: { className: 'flex flex-col @sm:flex-row @sm:flex-wrap gap-static-md' },
    children: actions,
  },
];

const image: ElementConfig<HTMLTagOrComponent> = {
  // stacked, the image defines its height by its aspect ratio, side by side it fills the height of the text
  tag: 'img',
  properties: {
    className: 'block w-full h-full object-cover @max-2xl:aspect-video @2xl:absolute @2xl:inset-0',
    src: 'assets/porsche-718-gts.jpg',
    alt: 'Porsche 718 GTS',
  },
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  // the tile is the query container: image and text are stacked and placed side by side from `@2xl`,
  // the buttons are stacked and placed side by side from `@sm`
  tag: 'p-tile',
  properties: {
    className:
      '@container motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:shadow-sm',
    aspectRatio: '16/9',
    background: 'canvas',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['Show details of the Porsche 718 Boxster'] },
    {
      tag: 'div',
      properties: { className: 'grow self-stretch grid @2xl:grid-cols-2 gap-fluid-md' },
      children: [
        {
          // negative margins equal to the read-only tile padding let the image bleed to the edges of the tile,
          // the tile clips it to its corner radius
          tag: 'div',
          properties: {
            className: 'relative -mt-(--ref-p-tile-py) -mx-(--ref-p-tile-px) @2xl:-my-(--ref-p-tile-py) @2xl:me-0',
          },
          children: [image],
        },
        {
          tag: 'div',
          properties: { className: 'flex flex-col gap-fluid-sm' },
          children: createDetails(
            { tag: 'p-heading', properties: { tag: 'h3', size: 'lg' }, children: ['Porsche 718 Boxster (982)'] },
            [
              {
                // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a
                // redundant link; `pointer-events-auto` opts out of the click-through tile content, so it shows its
                // own hover state and triggers the shadow
                tag: 'p-link',
                properties: { className: 'pointer-events-auto', 'aria-hidden': 'true' },
                children: [{ tag: 'a', properties: { href: '#', tabIndex: -1 }, children: ['Show details'] }],
              },
              {
                // independent action, so it stays accessible; `pointer-events-auto` makes it clickable instead of
                // passing clicks through to the anchor
                tag: 'p-button',
                properties: {
                  className: 'pointer-events-auto',
                  type: 'button',
                  variant: 'secondary',
                  icon: 'bookmark',
                },
                children: ['Save'],
              },
            ]
          ),
        },
      ],
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // same layout with Tailwind CSS only: the outer element is the query container, positioning context of the
  // stretched link and carries the radius, the inner element lays out the content and clips it to the radius
  tag: 'article',
  properties: {
    className:
      '@container relative isolate grid aspect-video rounded-3xl bg-canvas text-primary motion-safe:transition-shadow duration-sm ease-in-out has-[a:hover]:shadow-sm',
  },
  children: [
    {
      tag: 'div',
      properties: {
        className: 'min-w-0 grid @2xl:grid-cols-2 gap-fluid-md p-fluid-md overflow-clip rounded-[inherit]',
      },
      children: [
        {
          // negative margins equal to the padding let the image bleed to the edges, the parent clips it to the radius
          tag: 'div',
          properties: { className: 'relative -mt-fluid-md -mx-fluid-md @2xl:-my-fluid-md @2xl:me-0' },
          children: [image],
        },
        {
          tag: 'div',
          properties: { className: 'flex flex-col gap-fluid-sm' },
          children: createDetails(
            {
              tag: 'p-heading',
              properties: { tag: 'h3', size: 'lg' },
              children: [
                {
                  // stretched link: its `::after` covers the whole tile and renders the focus ring around it, it isn't
                  // clipped since it is positioned relative to the outer element
                  tag: 'a',
                  properties: { className: stretchedLinkClassName, href: '#' },
                  children: ['Porsche 718 Boxster (982)'],
                },
              ],
            },
            [
              {
                // visual duplicate of the stretched link, hidden from assistive technology and keyboard to avoid a
                // redundant link; `relative z-2` places it above the stretched link, so it shows its own hover state
                tag: 'p-link',
                properties: { className: 'relative z-2', 'aria-hidden': 'true' },
                children: [{ tag: 'a', properties: { href: '#', tabIndex: -1 }, children: ['Show details'] }],
              },
              {
                // independent action, so it stays accessible; `relative z-2` places it above the stretched link, so it is
                // clickable
                tag: 'p-button',
                properties: { className: 'relative z-2', type: 'button', variant: 'secondary', icon: 'bookmark' },
                children: ['Save'],
              },
            ]
          ),
        },
      ],
    },
  ],
};

export const tileStoryVehicleListing: Story<'p-tile'> = {
  generator: () => [createComparison(tile, tailwindTile)],
};
