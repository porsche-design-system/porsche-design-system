'use client';

import type { SlotStories, Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const radioGroupSlotStories: SlotStories<'p-radio-group'> = {
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

const radioGroupOptions: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'p-radio-group-option', properties: { value: 'a', label: 'Option A' } },
  { tag: 'p-radio-group-option', properties: { value: 'b', label: 'Option B' } },
  { tag: 'p-radio-group-option', properties: { value: 'c', label: 'Option C' } },
  { tag: 'p-radio-group-option', properties: { value: 'd', label: 'Option D' } },
  { tag: 'p-radio-group-option', properties: { value: 'e', label: 'Option E' } },
  { tag: 'p-radio-group-option', properties: { value: 'f', label: 'Option F' } },
];

export const radioGroupStory: Story<'p-radio-group'> = {
  state: {
    properties: {
      name: 'options',
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-radio-group',
      properties,
      children: [...(slots?.['label-after']?.generator() ?? []), ...radioGroupOptions],
    },
  ],
};

