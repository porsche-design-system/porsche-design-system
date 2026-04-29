'use client';

import type { SlotStories, Story } from '@/models/story';

export const inputPasswordSlotStories: SlotStories<'p-input-password'> = {
  start: {
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

export const inputPasswordStory: Story<'p-input-password'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name', toggle: true },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-input-password',
      properties,
      children: [
        ...(slots?.start?.generator() ?? []),
        ...(slots?.end?.generator() ?? []),
        ...(slots?.['label-after']?.generator() ?? []),
      ],
    },
  ],
};

export const inputPasswordStoryToggle: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { label: 'Some label', name: 'some-name', toggle: true },
    },
  ],
};

export const inputPasswordStorySlots: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            ' and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: [
            'Some Popover content with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some description with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: [
            'Some error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
      ],
    },
  ],
};
