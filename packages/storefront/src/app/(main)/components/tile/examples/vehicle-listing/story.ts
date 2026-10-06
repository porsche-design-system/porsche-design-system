'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const href = 'https://finder.porsche.com/de/de-DE/details/porsche-718-boxster-gebraucht-RNG8K7?model=718';

const createText = (text: string): ElementConfig<HTMLTagOrComponent> => ({ tag: 'p-text', children: [text] });

export const tileStoryVehicleListing: Story<'p-tile'> = {
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: 'auto',
        className:
          'rounded-3xl [--p-tile-px:var(--spacing-fluid-md)] [--p-tile-py:var(--spacing-fluid-md)] [--p-tile-main-align:stretch] [--p-tile-start-align:stretch] motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover,.primary-link:hover]:shadow-sm',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href }, children: ['Show details of the Porsche 718 Boxster'] },
        {
          tag: 'img',
          properties: {
            slot: 'start',
            src: 'assets/porsche-718-gts.jpg',
            alt: '',
            // negative margins equal to the tile padding let the image bleed to the edges of the tile
            className: 'flex-1 min-h-0 -ms-(--p-tile-px) -my-(--p-tile-py) object-cover rounded-s-3xl',
          },
        },
        { tag: 'p-heading', properties: { tag: 'h3', size: 'lg' }, children: ['Porsche 718 Boxster (982)'] },
        createText('Porsche Approved Pre-owned'),
        { tag: 'p-divider' },
        createText('White · Black'),
        createText('Petrol · 58,540 km · 04/2017 · 2 previous owners · Accident-free'),
        createText('220 kW / 300 PS · Rear-wheel drive · Manual'),
        { tag: 'p-divider' },
        { tag: 'p-text', properties: { size: 'md' }, children: ['€59,900'] },
        {
          tag: 'div',
          properties: { className: 'flex flex-wrap gap-static-md' },
          children: [
            {
              // duplicates the anchor, so it is hidden from assistive technology and keyboard
              tag: 'p-link',
              properties: {
                href,
                className: 'primary-link pointer-events-auto',
                'aria-hidden': 'true',
                tabIndex: -1,
              },
              children: ['Show details'],
            },
            {
              tag: 'p-button',
              properties: { type: 'button', variant: 'secondary', icon: 'bookmark', className: 'pointer-events-auto' },
              children: ['Save'],
            },
          ],
        },
      ],
    },
  ],
};
