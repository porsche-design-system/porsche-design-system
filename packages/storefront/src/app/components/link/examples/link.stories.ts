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
      generator: () => [{ tag: 'a', properties: { href: 'https://www.porsche.com' }, children: ['Some label'] }],
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
      properties,
      children: slots?.default?.generator() ?? [],
    },
  ],
};
