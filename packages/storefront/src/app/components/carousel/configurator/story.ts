'use client';

import type { Story } from '@/models/story';

export const carouselStory: Story<'p-carousel'> = {
  state: {
    properties: { heading: 'Some heading', trimSpace: true, pagination: true, rewind: true },
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
        {
          tag: 'div',
          properties: { className: 'grid place-content-center h-[150px] bg-surface prose-text-sm' },
          children: ['Slide 4'],
        },
      ],
    },
  ],
};

