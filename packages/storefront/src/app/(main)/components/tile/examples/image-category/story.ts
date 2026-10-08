'use client';

import type { Story } from '@/models/story';

export const tileStoryImageCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        className: 'scheme-dark group',
        aspectRatio: '1/1',
        gradient: 'bottom',
      },
      children: [
        {
          tag: 'img',
          properties: {
            slot: 'background',
            className:
              "motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,p-link[tabindex='-1']:hover]:scale-105",
            src: 'assets/porsche-992-carrera-s.jpg',
            alt: 'Porsche 992 Carrera S',
          },
        },
        { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['911'] },
        {
          tag: 'p-heading',
          properties: { slot: 'bottom', tag: 'h3', size: 'md', weight: 'semibold' },
          children: ['911'],
        },
        {
          // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a redundant
          // link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own hover state and
          // triggers the zoom
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            className: 'ms-auto pointer-events-auto',
            href: '#',
            variant: 'secondary',
            icon: 'arrow-right',
            hideLabel: true,
            compact: true,
            'aria-hidden': 'true',
            tabIndex: -1,
          },
          children: ['911'],
        },
      ],
    },
  ],
};
