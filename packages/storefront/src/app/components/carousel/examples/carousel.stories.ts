'use client';

import type { Story } from '@/models/story';

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
