'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: { className: 'group', aspectRatio: '4/3' },
  children: [
    {
      // signature and vehicle are stacked in the same grid cell, the margin lets the vehicle overlap the signature; the
      // mask of the signature paints it above non-positioned content, so `z-1` places the vehicle in front of it
      tag: 'div',
      properties: { className: 'grid grid-cols-1 w-full max-w-[560px]' },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            className:
              '[grid-area:1/1] justify-self-center [--p-model-signature-width:75%] [--p-model-signature-color:var(--color-canvas)]',
            model: '911',
            safeZone: false,
          },
        },
        {
          // nested, so it is zoomed via its own classes instead of `--p-tile-media-scale`; `group-has-[a:hover]` only
          // matches the slotted anchor of the covering link, since the "Configure" link renders its anchor in its
          // shadow DOM
          tag: 'img',
          properties: {
            className:
              '[grid-area:1/1] z-1 w-full mt-[6%] motion-safe:transition-transform duration-md ease-in-out motion-safe:group-has-[a:hover]:scale-105',
            src: 'assets/model-series/911.webp',
            alt: '',
            width: 776,
            height: 276,
          },
        },
      ],
    },
    {
      tag: 'p-heading',
      properties: { tag: 'h3', size: 'sm', align: 'center' },
      children: ['The iconic sports car with rear engine'],
    },
    {
      tag: 'p-text',
      properties: { size: 'xs', color: 'contrast-medium', align: 'center' },
      children: ['From €123,456.00* or €1,234.00/month*'],
    },
    {
      tag: 'div',
      properties: { className: 'flex flex-wrap justify-center items-center gap-static-md mt-fluid-sm' },
      children: [
        {
          // covers the tile, so the whole tile is clickable; it shows its own hover state whenever the tile is hovered
          tag: 'p-link',
          properties: { variant: 'primary', cover: true },
          children: [{ tag: 'a', properties: { href: '#' }, children: ['Discover 911'] }],
        },
        {
          // independent action, `relative z-2` places it above the covering link, so it is clickable; the accessible
          // name contains the visible label and identifies the model
          tag: 'p-link',
          properties: {
            className: 'relative z-2',
            variant: 'secondary',
            href: '#',
            aria: { 'aria-label': 'Configure 911' },
          },
          children: ['Configure'],
        },
      ],
    },
  ],
};

export const tileStoryModelTeaser: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [tile],
};
