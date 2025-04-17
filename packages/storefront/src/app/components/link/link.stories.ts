'use client';

import type { SlotStories, Story } from '@/models/story';

export const linkSlotStories: SlotStories<'p-link'> = {
  default: {
    basic: {
      name: 'Basic',
      generator: () => ['Some label'],
    },
    'slotted-anchor': {
      name: 'Slotted Anchor',
      // @ts-ignore
      generator: ({ properties } = { href: 'https://www.porsche.com' }) => [
        { tag: 'a', properties, children: ['Some label'] },
      ],
    },
  },
};

export const linkStory: Story<'p-link'> = {
  state: {
    properties: { href: 'https://porsche.com' },
    slots: {
      default: linkSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-link',
      properties: Object.fromEntries(
        Object.entries(properties ?? {}).filter(([name]) =>
          slots?.default.name === 'Slotted Anchor' ? name !== 'href' : true
        )
      ),
      children:
        slots?.default?.generator(
          slots?.default.name === 'Slotted Anchor' ? { properties: { href: properties?.href } } : undefined
        ) ?? [],
    },
  ],
};

export const linkStoryFrameworkRouting: Story<'p-link'> = {
  generator: () => [
    {
      tag: 'p-link',
      children: [
        {
          tag: 'a',
          properties: { href: 'https://porsche.com' },
          children: ['Some label'],
        },
      ],
    },
  ],
};

export const linkStoryIcon: Story<'p-link'> = {
  generator: () => [
    {
      tag: 'p-link',
      properties: { href: 'https://porsche.com', icon: 'phone' },
      children: ['Some label'],
    },
    {
      tag: 'p-link',
      properties: { href: 'https://porsche.com', iconSource: 'assets/icon-custom-kaixin.svg', hideLabel: true },
      children: ['Some label'],
    },
  ],
};
