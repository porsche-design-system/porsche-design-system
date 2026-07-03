'use client';

import type { SlotStories, Story } from '@/models/story';

export const popoverSlotStories: SlotStories<'p-popover'> = {
  default: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-text',
          children: ['Some additional content.'],
        },
      ],
    },
  },
};

export const popoverStory: Story<'p-popover'> = {
  state: {
    slots: {
      default: popoverSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [...(slots?.default?.generator() ?? [])],
    },
  ],
};

