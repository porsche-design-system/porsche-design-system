'use client';

import type { SlotStories, Story } from '@/models/story';

export const linkTileSlotStory: SlotStories<'p-link-tile'> = {
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

export const linkTileStory: Story<'p-link-tile'> = {
  state: {
    properties: {
      href: 'https://porsche.com',
      label: 'Some label',
      description: 'Some Description',
      gradient: true,
    },
    slots: {
      header: linkTileSlotStory.header.basic,
      footer: linkTileSlotStory.footer.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-link-tile',
      properties,
      children: [
        ...(slots?.header?.generator() ?? []),
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        ...(slots?.footer?.generator() ?? []),
      ],
    },
  ],
};

