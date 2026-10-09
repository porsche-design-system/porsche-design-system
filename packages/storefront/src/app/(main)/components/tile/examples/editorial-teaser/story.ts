'use client';

import {
  createComparison,
  stretchedLinkWithoutRadiusClassName,
} from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const label = 'Masterpieces';

const createLayout = (image: ElementConfig<HTMLTagOrComponent>, text: Children): Children => [
  {
    // clips the zooming image to the radius
    tag: 'div',
    properties: { className: 'overflow-clip rounded-3xl' },
    children: [image],
  },
  {
    tag: 'div',
    properties: { className: 'flex flex-col items-start gap-fluid-sm' },
    children: text,
  },
];

const createImage = (className: string): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'img',
  properties: {
    className: `block w-full aspect-video object-cover motion-safe:transition-transform duration-md ease-in-out ${className}`,
    src: 'assets/porsche-911-gt2-rs.jpg',
    alt: 'Porsche 911 GT2 RS in front of a hangar',
  },
});

const description: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-text',
  children: [
    'Hardly any brand stands for personal freedom and individuality like Porsche. Porsche Exclusive Manufaktur and the Sonderwunsch programme offer personalisation options at the highest level.',
  ],
};

// slotted anchor, so the hidden link contains no focusable element
const linkChildren: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'a', properties: { href: '#', tabIndex: -1 }, children: ['Read more'] },
];

const tile: ElementConfig<HTMLTagOrComponent> = {
  // without padding, background and corner radius, the tile provides the clickable area and its focus ring; the radius
  // would clip the text at the corners, so only the image is rounded
  tag: 'p-tile',
  properties: {
    className: '@container group [--p-tile-px:0] [--p-tile-py:0] [--p-tile-radius:0]',
    aspectRatio: 'auto',
    background: 'none',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['Read more about masterpieces'] },
    {
      // the tile is the query container: image and text are stacked and placed side by side from `@2xl`
      tag: 'div',
      properties: { className: 'grow self-stretch grid @2xl:grid-cols-2 gap-fluid-md text-start' },
      children: createLayout(createImage('group-has-[[slot=anchor]:hover,p-link-pure[aria-hidden]:hover]:scale-105'), [
        { tag: 'p-heading', properties: { tag: 'h3', size: 'lg', weight: 'semibold' }, children: [label] },
        description,
        {
          // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a
          // redundant link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own
          // hover state and triggers the zoom
          tag: 'p-link-pure',
          properties: { className: 'pointer-events-auto', 'aria-hidden': 'true' },
          children: linkChildren,
        },
      ]),
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // the outer element is the query container and the positioning context of the stretched link, the inner element
  // lays out the content
  tag: 'article',
  properties: { className: '@container group relative isolate text-primary' },
  children: [
    {
      tag: 'div',
      properties: { className: 'grid @2xl:grid-cols-2 gap-fluid-md' },
      children: createLayout(createImage('group-has-[a:hover]:scale-105'), [
        {
          tag: 'p-heading',
          properties: { tag: 'h3', size: 'lg', weight: 'semibold' },
          children: [
            { tag: 'a', properties: { className: stretchedLinkWithoutRadiusClassName, href: '#' }, children: [label] },
          ],
        },
        description,
        {
          // visual duplicate of the stretched link, hidden from assistive technology and keyboard to avoid a redundant
          // link; `relative z-2` places it above the stretched link, so it shows its own hover state
          tag: 'p-link-pure',
          properties: { className: 'relative z-2', 'aria-hidden': 'true' },
          children: linkChildren,
        },
      ]),
    },
  ],
};

export const tileStoryEditorialTeaser: Story<'p-tile'> = {
  generator: () => [createComparison(tile, tailwindTile, { stacked: true })],
};
