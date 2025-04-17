'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const carouselStory: Story<'p-carousel'> = {
  state: {
    properties: { heading: 'Some heading' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-carousel',
      properties,
      children: [
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 1'] },
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 2'] },
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 3'] },
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 4'] },
      ],
    },
    {
      tag: 'style',
      children: [
        `.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
    color: #010205;
  }`,
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
        ...['10vw', '200px', '100px', '40vw', '150px', '50vw'].map((width, index) => ({
          tag: 'div',
          properties: { className: 'slide', style: { width } },
          children: [`Slide ${index + 1}`, { tag: 'p', children: [`(${width})`] }],
        })),
      ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
    },
    {
      tag: 'style',
      children: [
        `.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
    color: #010205;
  }`,
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
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 1'] },
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 2'] },
        { tag: 'div', properties: { className: 'slide' }, children: ['Slide 3'] },
      ],
    },
    {
      tag: 'style',
      children: [
        `.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
    color: #010205;
  }`,
      ],
    },
  ],
};
