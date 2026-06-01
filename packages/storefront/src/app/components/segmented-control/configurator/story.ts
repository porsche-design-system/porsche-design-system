'use client';

import type { SlotStories, Story } from '@/models/story';

export const segmentedControlSlotStories: SlotStories<'p-segmented-control'> = {
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

export const segmentedControlStory: Story<'p-segmented-control'> = {
  state: {
    properties: {
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-segmented-control',
      properties,
      children: [
        ...(slots?.['label-after']?.generator() ?? []),
        { tag: 'p-segmented-control-item', properties: { value: '1' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', properties: { value: '2' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', properties: { value: '3' }, children: ['Option 3'] },
        { tag: 'p-segmented-control-item', properties: { value: '4' }, children: ['Option 4'] },
        { tag: 'p-segmented-control-item', properties: { value: '5' }, children: ['Option 5'] },
      ],
    },
  ],
};

