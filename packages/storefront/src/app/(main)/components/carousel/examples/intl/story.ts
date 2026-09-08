'use client';

import type { Story } from '@/models/story';

export const carouselStoryIntl: Story<'p-carousel'> = {
  state: {
    properties: {
      heading: 'Some heading',
      intl: {
        slideLabel: 'Slide %s von %s',
        prev: 'Vorheriger Slide',
        next: 'Nchster Slide',
        first: 'Zum ersten Slide',
        last: 'Zum letzten Slide',
      },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-carousel',
      properties,
      children: [
        {
          tag: 'div',
          properties: { className: 'grid place-content-center h-[150px] bg-surface prose-text-sm' },
          children: ['Slide 1'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center h-[150px] bg-surface prose-text-sm' },
          children: ['Slide 2'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center h-[150px] bg-surface prose-text-sm' },
          children: ['Slide 3'],
        },
      ],
    },
  ],
};

