'use client';

import type { SlotStories, Story } from '@/models/story';

export const checkboxSlotStories: SlotStories<'p-checkbox'> = {
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

export const checkboxStory: Story<'p-checkbox'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
      children: [...(slots?.['label-after']?.generator() ?? [])],
    },
  ],
};

