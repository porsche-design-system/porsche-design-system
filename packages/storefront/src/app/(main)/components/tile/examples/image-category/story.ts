'use client';

import type { Story } from '@/models/story';

const href = 'https://www.porsche.com/international/models/911/';
const label = '911';

export const tileStoryImageCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: '1/1',
        gradient: 'bottom',
        className: 'scheme-dark group [--p-tile-bottom-align:center] [--p-tile-bottom-justify:space-between]',
      },
      children: [
        {
          tag: 'img',
          properties: {
            slot: 'background',
            src: 'assets/porsche-992-carrera-s.jpg',
            alt: '',
            className:
              'motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,.primary-link:hover]:scale-105',
          },
        },
        { tag: 'a', properties: { slot: 'anchor', href }, children: [label] },
        {
          tag: 'p-heading',
          properties: { slot: 'bottom', tag: 'h3', size: 'md', weight: 'semibold' },
          children: [label],
        },
        {
          // duplicates the anchor, so it is hidden from assistive technology and keyboard
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            href,
            variant: 'secondary',
            icon: 'arrow-right',
            hideLabel: true,
            compact: true,
            className: 'primary-link pointer-events-auto',
            'aria-hidden': 'true',
            tabIndex: -1,
          },
          children: [label],
        },
      ],
    },
  ],
};
