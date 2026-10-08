'use client';

import type { Story } from '@/models/story';

export const tileStoryModelNavigation: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        className: 'group motion-safe:transition-colors duration-sm ease-in-out has-[[slot=anchor]:hover]:bg-canvas',
        aspectRatio: '16/9',
        background: 'none',
        compact: true,
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: ['718'] },
        { tag: 'p-heading', properties: { slot: 'top', tag: 'h3', size: 'md' }, children: ['718'] },
        {
          tag: 'img',
          properties: {
            className:
              'pe-static-md motion-safe:transition-transform duration-sm ease-in-out group-has-[[slot=anchor]:hover]:translate-x-static-md',
            src: 'assets/model-series/718.webp',
            alt: 'Porsche 718',
            width: 640,
            height: 228,
          },
        },
        { tag: 'p-tag', properties: { slot: 'bottom' }, children: ['Petrol'] },
      ],
    },
  ],
};
