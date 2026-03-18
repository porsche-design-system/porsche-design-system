'use client';

import type { SlotStories, Story } from '@/models/story';

export const inputTelSlotStories: SlotStories<'p-input-tel'> = {
  start: {
    text: {
      name: 'Text',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'start', color: 'contrast-medium', 'aria-hidden': true },
          children: ['Tel'],
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
          properties: { slot: 'start', name: 'home', color: 'contrast-medium', 'aria-hidden': true },
        },
      ],
    },
  },
  end: {
    text: {
      name: 'Text',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'end', color: 'contrast-medium', 'aria-hidden': true },
          children: ['Tel'],
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
          properties: { slot: 'end', name: 'home', color: 'contrast-medium', 'aria-hidden': true },
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

export const inputTelStory: Story<'p-input-tel'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name', indicator: true },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-input-tel',
      properties,
      children: [
        ...(slots?.start?.generator() ?? []),
        ...(slots?.end?.generator() ?? []),
        ...(slots?.['label-after']?.generator() ?? []),
      ],
    },
  ],
};

export const inputTelStorySlots: Story<'p-input-tel'> = {
  generator: () => [
    {
      tag: 'p-input-tel',
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
          tag: 'p-icon',
          properties: { slot: 'start', name: 'home', color: 'contrast-medium', 'aria-hidden': true },
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
