'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const href = 'https://porsche.com';
const label = 'Some label';

const anchor: ElementConfig<HTMLTagOrComponent> = {
  tag: 'a',
  properties: { slot: 'anchor', href },
  children: [label],
};

// duplicates the anchor, so it is hidden from assistive technology and keyboard but receives pointer events for its own
// hover state, the `primary-link` marker class lets the tile hover effect stay active while it is hovered
const primaryLink: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-link',
  properties: {
    slot: 'bottom',
    href,
    className: 'primary-link pointer-events-auto',
    'aria-hidden': 'true',
    tabIndex: -1,
  },
  children: [label],
};

export const tileStoryTeaser: Story<'p-tile'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'grid grid-cols-2 gap-static-md' },
      children: [
        {
          tag: 'p-tile',
          properties: { gradient: 'bottom', className: 'group' },
          children: [
            {
              tag: 'img',
              properties: {
                slot: 'background',
                src: 'assets/lights.jpg',
                alt: '',
                className:
                  'motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,.primary-link:hover]:scale-105',
              },
            },
            anchor,
            primaryLink,
          ],
        },
        {
          tag: 'p-tile',
          properties: {
            className: 'has-[[slot=anchor]:hover,.primary-link:hover]:[--p-tile-bg:var(--color-contrast-lower)]',
          },
          children: [anchor, { tag: 'p-text', properties: { size: 'lg' }, children: ['Some content'] }, primaryLink],
        },
      ],
    },
  ],
};
