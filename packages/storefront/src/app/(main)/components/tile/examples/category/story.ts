'use client';

import type { Story } from '@/models/story';

const href = 'https://shop.porsche.com/de/de-DE/c/bags-and-luggage';
const label = 'Bags & Luggage';

export const tileStoryCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: '3/4',
        className: 'group',
      },
      children: [
        {
          tag: 'img',
          properties: {
            slot: 'background',
            src: 'assets/weekender.webp',
            alt: '',
            className:
              'pt-[20%] object-contain object-bottom mix-blend-multiply motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,.primary-link:hover]:scale-105',
          },
        },
        { tag: 'a', properties: { slot: 'anchor', href }, children: [label] },
        {
          tag: 'p-heading',
          properties: { slot: 'top', tag: 'h3', size: 'md', weight: 'semibold' },
          children: [label],
        },
        {
          // duplicates the anchor, so it is hidden from assistive technology and keyboard
          tag: 'p-link',
          properties: {
            slot: 'top',
            href,
            variant: 'secondary',
            icon: 'arrow-right',
            hideLabel: true,
            compact: true,
            className: 'primary-link ms-auto pointer-events-auto',
            'aria-hidden': 'true',
            tabIndex: -1,
          },
          children: [label],
        },
      ],
    },
  ],
};
