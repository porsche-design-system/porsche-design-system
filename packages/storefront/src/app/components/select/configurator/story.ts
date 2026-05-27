'use client';

import type { SlotStories, Story } from '@/models/story';

export const selectSlotStories: SlotStories<'p-select'> = {
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

export const selectStory: Story<'p-select'> = {
  state: {
    properties: {
      name: 'options',
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-select',
      properties,
      children: [
        ...(slots?.['label-after']?.generator() ?? []),
        { tag: 'p-select-option', properties: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-select-option', properties: { value: 'c' }, children: ['Option C'] },
        { tag: 'p-select-option', properties: { value: 'd' }, children: ['Option D'] },
        { tag: 'p-select-option', properties: { value: 'e' }, children: ['Option E'] },
        { tag: 'p-select-option', properties: { value: 'f' }, children: ['Option F'] },
      ],
    },
  ],
};

