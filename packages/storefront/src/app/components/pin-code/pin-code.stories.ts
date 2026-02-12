'use client';

import type { Story, SlotStories } from '@/models/story';

export const pinCodeSlotStories: SlotStories<'p-pin-code'> = {
  'label-after': {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-popover',
          properties: { slot: 'label-after', className: 'ms-static-xs' },
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

export const pinCodeStorySlots: Story<'p-pin-code'> = {
  generator: () => [
    {
      tag: 'p-pin-code',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id' },
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
          properties: { slot: 'label-after', className: 'ms-static-xs' },
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
          properties: { slot: 'description', id: 'some-description-id' },
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
          properties: { slot: 'message', id: 'some-message-id' },
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
