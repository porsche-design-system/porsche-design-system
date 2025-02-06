'use client';

import { type SlotStories, type Story, componentSlotStories } from '@/models/story';

export const linkSlotStories: SlotStories = {
  default: {
    basic: {
      name: 'Basic',
      generator: () => ['Some label'],
    },
    'slotted-anchor': {
      name: 'Slotted Anchor',
      generator: () => [{ tag: 'a', properties: { href: 'https://www.porsche.com' }, children: ['Some label'] }],
    },
  },
};

export const linkStory: Story = {
  state: {
    properties: { href: 'https://porsche.com' },
    slots: {
      default: linkSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-link',
      properties,
      children: slots?.default?.generator() ?? [],
    },
  ],
};
