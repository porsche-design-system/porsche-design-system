'use client';

import type { Story } from '@/models/story';

export const tileStoryModelNavigation: Story<'p-tile'> = {
  previewMaxWidth: '352px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: 'auto',
        compact: true,
        className:
          'group rounded-2xl bg-transparent motion-safe:transition-colors duration-sm ease-in-out has-[[slot=anchor]:hover]:bg-canvas [--p-tile-radius:var(--radius-2xl)] [--p-tile-bg:transparent]',
      },
      children: [
        {
          tag: 'a',
          properties: { slot: 'anchor', href: 'https://finder.porsche.com/de/de-DE/search/718?model=718' },
          children: ['718'],
        },
        { tag: 'p-heading', properties: { slot: 'top', tag: 'h3', size: 'md' }, children: ['718'] },
        {
          tag: 'img',
          properties: {
            src: 'assets/718.png',
            alt: '',
            width: 271,
            height: 96,
            className:
              'self-start w-[calc(100%-12px)] h-auto motion-safe:transition-transform duration-sm ease-in-out group-has-[[slot=anchor]:hover]:translate-x-[12px]',
          },
        },
        {
          tag: 'span',
          properties: {
            slot: 'bottom',
            className:
              'prose-text-xs rounded-full px-static-sm py-static-xs bg-canvas motion-safe:transition-colors duration-sm ease-in-out group-has-[[slot=anchor]:hover]:bg-frosted',
          },
          children: ['Petrol'],
        },
      ],
    },
  ],
};
