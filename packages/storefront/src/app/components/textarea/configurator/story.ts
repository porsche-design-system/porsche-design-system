'use client';

import type { SlotStories, Story } from '@/models/story';

export const textareaSlotStories: SlotStories<'p-textarea'> = {
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

export const textareaStory: Story<'p-textarea'> = {
  state: {
    properties: { name: 'some-name', label: 'Some label' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-textarea',
      properties,
      children: [...(slots?.['label-after']?.generator() ?? [])],
    },
  ],
};

