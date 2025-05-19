'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

export const linkTileModelSignatureStory: Story<'p-link-tile-model-signature'> = {
  state: {
    properties: { heading: 'Some heading' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-tile-model-signature',
      properties,
      children: [
        {
          tag: 'p-tag',
          properties: { slot: 'header', color: 'background-frosted', compact: true },
          children: ['Some tag'],
        },
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        {
          tag: 'p-link',
          properties: { slot: 'primary', href: 'https://porsche.com/#primary' },
          children: ['Primary label'],
        },
        {
          tag: 'p-link',
          properties: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
          children: ['Secondary label'],
        },
      ],
    },
  ],
};

export const linkTileModelSignatureStoryLayout: Story<'p-link-tile-model-signature'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        {
          tag: 'p-link-tile-model-signature',
          properties: {
            aspectRatio: '4/3',
            heading:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                theme: 'dark',
                color: 'background-frosted',
                compact: true,
              },
              children: ['4/3'],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
            {
              tag: 'p-link',
              properties: { slot: 'primary', href: 'https://porsche.com/#primary' },
              children: ['Primary label'],
            },
            {
              tag: 'p-link',
              properties: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
              children: ['Secondary label'],
            },
          ],
        },
        ...(['4/3', '1/1', '9/16', '1/1'].map((ratio) => ({
          tag: 'p-link-tile-model-signature',
          properties: {
            aspectRatio: ratio,
            heading: 'Some description',
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                theme: 'dark',
                color: 'background-frosted',
                compact: 'true',
              },
              children: [ratio],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
            {
              tag: 'p-link',
              properties: { slot: 'primary', href: 'https://porsche.com/#primary' },
              children: ['Primary label'],
            },
            {
              tag: 'p-link',
              properties: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
              children: ['Secondary label'],
            },
          ],
        })) as ElementConfig<'p-link-tile-model-signature'>[]),
      ],
    },
  ],
};
