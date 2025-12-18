'use client';

import type { SlotStories, Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const buttonTileSlotStory: SlotStories<'p-button-tile'> = {
  header: {
    basic: {
      name: 'Basic header',
      generator: () => [
        {
          tag: 'p-tag',
          properties: { slot: 'header', className: 'dark', color: 'background-frosted', compact: true },
          children: ['Some tag'],
        },
      ],
    },
  },
  footer: {
    basic: {
      name: 'Basic footer',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'footer', className: 'dark' },
          children: ['Some footer text'],
        },
      ],
    },
  },
};

export const buttonTileStory: Story<'p-button-tile'> = {
  state: {
    properties: { label: 'Some label', description: 'Some Description', gradient: true, className: 'dark' },
    slots: {
      header: buttonTileSlotStory.header.basic,
      footer: buttonTileSlotStory.footer.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-button-tile',
      properties,
      children: [
        ...(slots?.header?.generator() ?? []),
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        ...(slots?.footer?.generator() ?? []),
      ],
    },
  ],
};

export const buttonTileStoryGrid: Story<'p-button-tile'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        ...['4/3', '4/3', '1/1', '9/16', '1/1'].map((aspectRatio, index) => ({
          tag: 'p-button-tile',
          properties: {
            aspectRatio: aspectRatio,
            label: 'Some Label',
            description:
              index === 0
                ? 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                : 'Some description',
            ...(index === 0 ? { size: 'large' } : {}),
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                className: 'dark',
                color: 'background-frosted',
                compact: 'true',
              },
              children: [aspectRatio],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
          ],
        })),
      ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
    },
  ],
};

export const buttonTileStoryFooterSlot: Story<'p-button-tile'> = {
  state: {
    properties: { label: 'Some label', description: 'Some Description' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        {
          tag: 'p-button-tile',
          properties,
          children: [
            {
              tag: 'p-tag',
              properties: { slot: 'header', className: 'dark', color: 'background-frosted', compact: true },
              children: ['Some tag'],
            },
            { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
            { tag: 'p-text', properties: { slot: 'footer', className: 'dark' }, children: ['Some footer text'] },
          ],
        },
        {
          tag: 'p-button-tile',
          properties: { ...properties, compact: true },
          children: [
            {
              tag: 'p-tag',
              properties: { slot: 'header', className: 'dark', color: 'background-frosted', compact: true },
              children: ['Some tag'],
            },
            { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
            { tag: 'p-text', properties: { slot: 'footer', className: 'dark' }, children: ['Some footer text'] },
          ],
        },
      ],
    },
  ],
};
