'use client';

import type { SlotStories, Story } from '@/models/story';

export const pinCodeSlotStories: SlotStories<'p-pin-code'> = {
  'label-after': {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: ['Some Popover Content.'],
        },
      ],
    },
  },
};

export const pinCodeStory: Story<'p-pin-code'> = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-pin-code',
      properties,
      children: [...(slots?.['label-after']?.generator() ?? [])],
    },
  ],
};

