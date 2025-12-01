'use client';

import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const visualizeGridConfig: ElementConfig<HTMLTagOrComponent> = {
  tag: 'div',
  properties: { className: 'transform-[translate3d(0,0,0)]' },
  children: [
    {
      tag: 'div',
      properties: { className: 'visualize-grid' },
      children: new Array(18).fill({ tag: 'span' }),
    },
    {
      tag: 'div',
      properties: { className: 'hero-grid' },
      children: [
        {
          tag: 'div',
          properties: { className: 'hero-media' },
          children: ['Full for Background and Media'],
        },
        {
          tag: 'div',
          properties: { className: 'hero-header' },
          children: [
            { tag: 'h1', properties: { className: 'display' }, children: ['Hero Heading'] },
            {
              tag: 'p',
              properties: { className: 'text-large' },
              children: ['Subline for the Hero Header in Wide Grid'],
            },
          ],
        },
      ],
    },
    {
      tag: 'div',
      properties: { className: 'wide-grid' },
      children: [
        {
          tag: 'div',
          properties: { className: 'wide-sidebar' },
          children: new Array(3).fill({
            tag: 'p-accordion',
            properties: { heading: 'Some Heading', tag: 'h2' },
          }),
        },
        { tag: 'div', properties: { className: 'wide-content' }, children: ['Wide Content'] },
      ],
    },
    {
      tag: 'div',
      properties: { className: 'hero-carousel' },
      children: [
        {
          tag: 'p-carousel',
          properties: { heading: 'Heading Carousel Basic' },
          children: ['Slide 1', 'Slide 2', 'Slide 3'],
        },
        {
          tag: 'p-carousel',
          properties: { heading: 'Heading Carousel Extended', width: 'extended' },
          children: ['Slide 1', 'Slide 2', 'Slide 3'],
        },
      ],
    },
  ],
};
