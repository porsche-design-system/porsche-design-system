'use client';

import type { SlotStories, Story } from '@/models/story';

export const popoverSlotStories: SlotStories<'p-popover'> = {
  button: {
    'custom-button': {
      name: 'Custom Button',
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, icon: 'car', slot: 'button' },
          children: ['More information'],
        },
      ],
    },
  },
};

export const popoverStory: Story<'p-popover'> = {
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [...(slots?.button?.generator() ?? []), 'Some additional content.'],
    },
  ],
};

export const popoverSlottedButtonStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, icon: 'car', slot: 'button' },
          children: ['More information'],
        },
        'Some additional content.',
      ],
    },
  ],
};
