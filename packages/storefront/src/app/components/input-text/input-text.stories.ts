'use client';

import type { SlotStories, Story } from '@/models/story';

export const inputTextSlotStories: SlotStories<'p-input-text'> = {
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
          properties: {
            slot: 'start',
            icon: 'information',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
          },
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
          properties: {
            slot: 'end',
            icon: 'information',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
          },
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

export const inputTextStory: Story<'p-input-text'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-input-text',
      properties,
      children: [...(slots?.start?.generator() ?? []), ...(slots?.end?.generator() ?? [])],
    },
  ],
};

export const inputTextStorySlots: Story<'p-input-text'> = {
  generator: () => [
    {
      tag: 'p-input-text',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'p-icon',
          properties: { slot: 'start', name: 'shopping-cart', color: 'contrast-medium', 'aria-hidden': true },
        },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'end',
            icon: 'delete',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
            aria: { 'aria-label': 'Delete' },
          },
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
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
