'use client';

import type { Story } from '@/models/story';

export const tileStoryCategory: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        className: '[--p-tile-gap-y:var(--spacing-fluid-lg)] group',
        aspectRatio: '3/4',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['Vehicle Accessories'] },
        {
          tag: 'p-heading',
          properties: { slot: 'top', tag: 'h3', size: 'md', weight: 'semibold' },
          children: ['Vehicle Accessories'],
        },
        {
          // visual duplicate of `<a slot="anchor">`, hidden from assistive technology and keyboard to avoid a redundant
          // link; `pointer-events-auto` opts out of the click-through tile content, so it shows its own hover state and
          // triggers the zoom
          tag: 'p-link',
          properties: {
            slot: 'top',
            className: 'ms-auto pointer-events-auto',
            href: '#',
            variant: 'secondary',
            icon: 'arrow-right',
            hideLabel: true,
            compact: true,
            'aria-hidden': 'true',
            tabIndex: -1,
          },
          children: ['Vehicle Accessories'],
        },
        {
          tag: 'img',
          properties: {
            className:
              "grow basis-0 min-h-0 self-stretch max-w-none -mb-(--ref-p-tile-py) -mx-(--ref-p-tile-px) object-cover object-top motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover,p-link[tabindex='-1']:hover]:scale-105",
            src: 'assets/products/roof-box-on-a-car.webp',
            alt: 'Porsche vehicle with roof box',
          },
        },
      ],
    },
  ],
};
