'use client';

import type {SlotStories, Story} from '@/models/story';

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
};

export const inputPasswordStory: Story<'p-input-password'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name', toggle: true },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-input-password',
      properties,
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

