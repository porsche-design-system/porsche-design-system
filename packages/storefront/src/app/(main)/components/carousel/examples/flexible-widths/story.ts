'use client';

import type { Story } from '@/models/story';

export const carouselStoryFlexibleWidths: Story<'p-carousel'> = {
  state: {
    properties: { heading: 'Some heading', slidesPerPage: 'auto', trimSpace: true, pagination: true, rewind: true },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-carousel',
      properties,
      children: [
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[10vw] h-[150px] bg-surface prose-text-sm' },
          children: ['10vw'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[200px] h-[150px] bg-surface prose-text-sm' },
          children: ['200px'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[100px] h-[150px] bg-surface prose-text-sm' },
          children: ['100px'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[40vw] h-[150px] bg-surface prose-text-sm' },
          children: ['40vw'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[150px] h-[150px] bg-surface prose-text-sm' },
          children: ['150px'],
        },
        {
          tag: 'div',
          properties: { className: 'grid place-content-center w-[50vw] h-[150px] bg-surface prose-text-sm' },
          children: ['50vw'],
        },
      ],
    },
  ],
};

