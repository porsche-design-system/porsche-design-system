'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const gridStory: Story<'p-grid'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-grid',
      properties,
      children: [{ tag: 'p-grid-item', properties: { size: 12 }, children: ['12'] }],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
        { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
        { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
        { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
        { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
        { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
        { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
        { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
        { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
        { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
        { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
        { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
      ],
    },
    {
      tag: 'style',
      children: [
        `p-grid {
    margin-top: 8px;
  }
        p-grid-item {
    color: #010205;
    text-align: center;
    background: #87cefa;
    background-clip: content-box;
  }`,
      ],
    },
  ],
};

export const visualizeGridConfig: ElementConfig<HTMLTagOrComponent> = {
  tag: 'div',
  properties: { style: { transform: 'translate3d(0, 0, 0)' } },
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
          children: Array(3).fill({
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
