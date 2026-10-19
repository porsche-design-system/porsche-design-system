'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';
import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const heading = 'Porsche Connect.';
const label = 'Discover Porsche Connect';

const imageProperties = {
  src: 'assets/dessert.jpg',
  alt: '',
};

const imageClassName = 'motion-safe:transition-transform duration-md ease-in-out';

const createContent = ({
  slot,
  heading: headingChildren,
  linkClassName = '',
  cover = false,
}: {
  slot?: 'start';
  heading: Children;
  linkClassName?: string;
  cover?: boolean;
}): Children => {
  // `slot` is only set within the tile
  const slotProperties = slot ? { slot } : {};
  return [
    { tag: 'p-heading', properties: { ...slotProperties, tag: 'h3', size: 'lg' }, children: headingChildren },
    {
      tag: 'p-text',
      properties: slotProperties,
      children: [
        'Porsche Connect enhances the driving experience with a wide range of music and video streaming services, the integrated Voice Pilot and remote services via the My Porsche app.',
      ],
    },
    cover
      ? {
          // covers the tile instead of the `anchor` slot, so the visible link is the only one and needs no duplicate;
          // it shows its own hover state whenever the tile is hovered
          tag: 'p-link',
          properties: { ...slotProperties, className: 'mt-fluid-sm', variant: 'secondary', cover },
          children: [{ tag: 'a', properties: { href: '#' }, children: [label] }],
        }
      : {
          // visual duplicate of the link covering the tile, hidden from assistive technology and keyboard to avoid a
          // redundant link; the slotted anchor ensures the hidden link contains no focusable element
          tag: 'p-link',
          properties: {
            ...slotProperties,
            className: `mt-fluid-sm ${linkClassName}`,
            variant: 'secondary',
            'aria-hidden': 'true',
          },
          children: [{ tag: 'a', properties: { href: '#', tabIndex: -1 }, children: [label] }],
        },
  ];
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark group',
    aspectRatio: '16/9',
    gradient: 'start',
  },
  children: [
    {
      tag: 'img',
      properties: {
        slot: 'background',
        className: `${imageClassName} group-has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:scale-105`,
        ...imageProperties,
      },
    },
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    ...createContent({
      slot: 'start',
      heading: [heading],
      // `pointer-events-auto` opts out of the click-through tile content, so the link shows its own hover state and
      // triggers the zoom
      linkClassName: 'pointer-events-auto',
    }),
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  // the tile is the positioning context of the stretched link, so it can't clip its content without clipping the focus
  // indicator; the columns mirror the `start` and default slots
  tag: 'article',
  properties: {
    className:
      'scheme-dark group relative isolate grid grid-cols-[fit-content(50%)_1fr] gap-fluid-sm p-fluid-md aspect-video rounded-3xl bg-canvas text-primary',
  },
  children: [
    {
      // background behind the content, clips the zooming image to the radius
      tag: 'div',
      properties: { className: 'absolute inset-0 -z-1 overflow-clip rounded-[inherit]' },
      children: [
        {
          tag: 'img',
          properties: {
            className: `size-full object-cover ${imageClassName} group-has-[a:hover]:scale-105`,
            ...imageProperties,
          },
        },
      ],
    },
    {
      // negative margins let the gradient bleed to the edges and fade out beyond the column, the padding compensates
      // them, so the content keeps the width of the column; `rounded-s-[inherit]` follows the radius of the tile
      tag: 'div',
      properties: {
        className:
          'flex flex-col justify-center items-start gap-fluid-sm -my-fluid-md -ms-fluid-md -me-fluid-lg py-fluid-md ps-fluid-md pe-fluid-lg bg-fade-to-r rtl:bg-fade-to-l rounded-s-[inherit]',
      },
      children: createContent({
        heading: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [heading] }],
        // `relative z-2` places the link above the stretched link, so it shows its own hover state
        linkClassName: 'relative z-2',
      }),
    },
  ],
};

const coverTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark group',
    aspectRatio: '16/9',
    gradient: 'start',
  },
  children: [
    {
      tag: 'img',
      properties: {
        slot: 'background',
        className: `${imageClassName} group-has-[p-link:hover]:scale-105`,
        ...imageProperties,
      },
    },
    ...createContent({ slot: 'start', heading: [heading], cover: true }),
  ],
};

export const tileStoryCallToAction: Story<'p-tile'> = {
  generator: () => [createComparison(tile, tailwindTile, { stacked: true, coverTile })],
};
