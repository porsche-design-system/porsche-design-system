'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

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

export const carouselStoryFlexibleWidths: Story<'p-carousel'> = {
  state: {
    properties: { heading: 'Some heading', slidesPerPage: 'auto' },
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

export const carouselStoryIntl: Story<'p-carousel'> = {
  state: {
    properties: {
      heading: 'Some heading',
      intl: {
        slideLabel: 'Slide %s von %s',
        prev: 'Vorheriger Slide',
        next: 'Nächster Slide',
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
