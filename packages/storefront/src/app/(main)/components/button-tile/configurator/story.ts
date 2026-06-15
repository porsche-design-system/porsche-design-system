'use client';

import type { SlotStories, Story } from '@/models/story';

export const buttonTileSlotStory: SlotStories<'p-button-tile'> = {
  header: {
    basic: {
      name: 'Basic header',
      generator: () => [
        {
          tag: 'p-tag',
          properties: { slot: 'header', color: 'background-frosted', compact: true },
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
          properties: { slot: 'footer' },
          children: ['Some footer text'],
        },
      ],
    },
  },
};

export const buttonTileStory: Story<'p-button-tile'> = {
  state: {
    properties: {
      label: 'Some label',
      description: 'Some Description',
      gradient: true,
    },
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

