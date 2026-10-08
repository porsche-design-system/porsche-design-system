'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const createText = (text: string): ElementConfig<HTMLTagOrComponent> => ({ tag: 'p-text', children: [text] });

export const tileStoryVehicleListing: Story<'p-tile'> = {
  generator: () => [
    {
      // the tile is the query container: image and text are stacked and placed side by side from `@2xl`,
      // the buttons are stacked and placed side by side from `@sm`
      tag: 'p-tile',
      properties: {
        className:
          "@container motion-safe:transition-shadow duration-sm ease-in-out has-[[slot=anchor]:hover,p-link[tabindex='-1']:hover]:shadow-sm",
        aspectRatio: '2/1',
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
              children: [
                {
                  // stacked, the image defines its height by its aspect ratio, side by side it fills the height of the text
                  tag: 'img',
                  properties: {
                    className: 'block w-full h-full object-cover @max-2xl:aspect-video @2xl:absolute @2xl:inset-0',
                    src: 'assets/porsche-718-gts.jpg',
                    alt: 'Porsche 718 GTS',
                  },
                },
              ],
            },
            {
              tag: 'div',
              properties: { className: 'flex flex-col gap-fluid-sm' },
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
                      // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a
                      // redundant link; `pointer-events-auto` opts out of the click-through tile content, so it shows its
                      // own hover state and triggers the shadow
                      tag: 'p-link',
                      properties: { className: 'pointer-events-auto', href: '#', 'aria-hidden': 'true', tabIndex: -1 },
                      children: ['Show details'],
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
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
