'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const createText = (text: string): ElementConfig<HTMLTagOrComponent> => ({ tag: 'p-text', children: [text] });

const tile: ElementConfig<HTMLTagOrComponent> = {
  // the tile is the query container, so the buttons are placed side by side as soon as the tile is wide enough
  tag: 'p-tile',
  properties: {
    className: '@container',
    aspectRatio: 'auto',
    background: 'canvas',
    bleed: true,
    hoverEffect: 'zoom',
  },
  children: [
    {
      // `bleed` lets the image reach the top and side edges of the tile, the tile clips it to its corner radius
      tag: 'img',
      properties: { className: 'aspect-video', src: 'assets/porsche-718-gts.jpg', alt: 'Porsche 718 GTS' },
    },
    {
      tag: 'div',
      properties: { slot: 'bottom', className: 'grow flex flex-col gap-fluid-sm' },
      children: [
        { tag: 'p-heading', properties: { tag: 'h3', size: 'lg' }, children: ['Porsche 718 Boxster (982)'] },
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
          children: [
            {
              // covers the tile, so the whole tile is clickable; the accessible name of its anchor contains the
              // visible label and identifies the vehicle
              tag: 'p-link',
              properties: { cover: true },
              children: [
                {
                  tag: 'a',
                  properties: { href: '#', 'aria-label': 'Show details of the Porsche 718 Boxster' },
                  children: ['Show details'],
                },
              ],
            },
            {
              // independent action, `relative z-2` places it above the covering link, so it is clickable
              tag: 'p-button',
              properties: { className: 'relative z-2', type: 'button', variant: 'secondary', icon: 'bookmark' },
              children: ['Save'],
            },
          ],
        },
      ],
    },
  ],
};

export const tileStoryVehicleListing: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [tile],
};
