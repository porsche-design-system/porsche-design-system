'use client';

import type { SlotStories, Story } from '@/models/story';

export const inputNumberSlotStories: SlotStories<'p-input-number'> = {
  start: {
    unit: {
      name: 'Unit',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'start', color: 'contrast-medium', 'aria-hidden': true },
          children: ['EUR'],
        },
      ],
    },
    button: {
      name: 'Button',
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { slot: 'start', icon: 'information', hideLabel: true, className: 'p-[4px]' },
        },
      ],
    },
    icon: {
      name: 'Icon',
      generator: () => [
        {
          tag: 'p-icon',
          properties: { slot: 'start', name: 'shopping-cart', color: 'contrast-medium', 'aria-hidden': true },
        },
      ],
    },
  },
  end: {
    unit: {
      name: 'Unit',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'end', color: 'contrast-medium', 'aria-hidden': true },
          children: ['EUR'],
        },
      ],
    },
    button: {
      name: 'Button',
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: { slot: 'end', icon: 'information', hideLabel: true, className: 'p-[4px]' },
        },
      ],
    },
    icon: {
      name: 'Icon',
      generator: () => [
        {
          tag: 'p-icon',
          properties: { slot: 'end', name: 'shopping-cart', color: 'contrast-medium', 'aria-hidden': true },
        },
      ],
    },
  },
};

export const inputNumberStory: Story<'p-input-number'> = {
  state: {
    properties: { label: 'Some label', name: 'Some name', controls: true },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-input-number',
      properties,
      children: [...(slots?.start?.generator() ?? []), ...(slots?.end?.generator() ?? [])],
    },
  ],
};

export const inputNumberStoryControls: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
      properties: { label: 'Some label', name: 'Some name', controls: true },
    },
  ],
};

export const inputNumberStoryUnit: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
      properties: { label: 'Some label', name: 'Some name' },
      children: [...inputNumberSlotStories.start.basic.generator()],
    },
  ],
};

export const inputNumberStorySlots: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description', id: 'some-description-id' },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message', id: 'some-message-id' },
          children: [
            'Some error message with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
      ],
    },
  ],
};
