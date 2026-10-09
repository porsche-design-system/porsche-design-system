'use client';

import {
  createComparison,
  stretchedLinkWithoutRadiusClassName,
} from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const label = 'The 718 Boxster GTS: an homage to coastal roads';

const createImage = (className: string): ElementConfig<HTMLTagOrComponent> => ({
  // clips the zooming image to the radius
  tag: 'div',
  properties: { className: 'self-stretch overflow-clip rounded-3xl' },
  children: [
    {
      tag: 'img',
      properties: {
        className: `block w-full aspect-video object-cover motion-safe:transition-transform duration-md ease-in-out ${className}`,
        src: 'assets/porsche-718-gts.jpg',
        alt: 'Porsche 718 Boxster GTS at the coast',
      },
    },
  ],
});

const createMeta = (shareButtonClassName: string): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'div',
  properties: { className: 'flex flex-wrap items-center gap-static-sm' },
  children: [
    { tag: 'p-tag', properties: { variant: 'secondary' }, children: ['Products'] },
    {
      tag: 'p-text',
      children: [{ tag: 'time', properties: { dateTime: '2026-09-01' }, children: ['September 1, 2026'] }],
    },
    {
      // independent action, so it stays accessible
      tag: 'p-button-pure',
      properties: {
        className: `${shareButtonClassName} p-static-xs -m-static-xs`,
        type: 'button',
        icon: 'share',
        hideLabel: true,
      },
      children: ['Share article'],
    },
  ],
});

const description: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-text',
  children: ['Design concept inspired by the coastline with an exclusive colour palette for exterior and interior.'],
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  // without padding, background and corner radius, the tile provides the clickable area and its focus ring; the radius
  // would clip the text at the corners, so only the image is rounded
  tag: 'p-tile',
  properties: {
    className: 'group [--p-tile-px:0] [--p-tile-py:0] [--p-tile-radius:0]',
    aspectRatio: 'auto',
    background: 'none',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    createImage('group-has-[[slot=anchor]:hover]:scale-105'),
    {
      tag: 'div',
      properties: { slot: 'bottom', className: 'grow flex flex-col gap-static-md' },
      children: [
        // `pointer-events-auto` makes the share button clickable instead of passing clicks through to the anchor
        createMeta('pointer-events-auto'),
        { tag: 'p-heading', properties: { tag: 'h3', size: 'md', weight: 'semibold' }, children: [label] },
        description,
      ],
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'article',
  properties: { className: 'group relative isolate flex flex-col gap-fluid-sm text-primary' },
  children: [
    createImage('group-has-[a:hover]:scale-105'),
    {
      tag: 'div',
      properties: { className: 'flex flex-col gap-static-md' },
      children: [
        // `relative z-2` places the share button above the stretched link, so it is clickable
        createMeta('relative z-2'),
        {
          tag: 'p-heading',
          properties: { tag: 'h3', size: 'md', weight: 'semibold' },
          children: [
            { tag: 'a', properties: { className: stretchedLinkWithoutRadiusClassName, href: '#' }, children: [label] },
          ],
        },
        description,
      ],
    },
  ],
};

export const tileStoryArticle: Story<'p-tile'> = {
  previewMaxWidth: '1136px',
  generator: () => [createComparison(tile, tailwindTile)],
};
