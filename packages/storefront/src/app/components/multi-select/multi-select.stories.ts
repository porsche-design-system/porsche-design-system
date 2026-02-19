'use client';

import type { Story, SlotStories } from '@/models/story';

export const multiSelectSlotStories: SlotStories<'p-multi-select'> = {
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

export const multiSelectStory: Story<'p-multi-select'> = {
  state: {
    properties: { name: 'name', label: 'Some Label', description: 'Some description' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-multi-select',
      properties,
      children: [
        ...(slots?.['label-after']?.generator() ?? []),
        { tag: 'p-multi-select-option', properties: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-multi-select-option', properties: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-multi-select-option', properties: { value: 'c' }, children: ['Option C'] },
        { tag: 'p-multi-select-option', properties: { value: 'd' }, children: ['Option D'] },
        { tag: 'p-multi-select-option', properties: { value: 'e' }, children: ['Option E'] },
        { tag: 'p-multi-select-option', properties: { value: 'f' }, children: ['Option F'] },
      ],
    },
  ],
};

export const multiSelectStoryOptgroup: Story<'p-multi-select'> = {
  state: {
    properties: { name: 'options', label: 'Some Label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-multi-select',
      properties,
      children: [
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 1' },
          children: [
            { tag: 'p-multi-select-option', properties: { value: 'a' }, children: ['Option A'] },
            { tag: 'p-multi-select-option', properties: { value: 'b' }, children: ['Option B'] },
            { tag: 'p-multi-select-option', properties: { value: 'c' }, children: ['Option C'] },
            { tag: 'p-multi-select-option', properties: { value: 'd' }, children: ['Option D'] },
            { tag: 'p-multi-select-option', properties: { value: 'e' }, children: ['Option E'] },
            { tag: 'p-multi-select-option', properties: { value: 'f' }, children: ['Option F'] },
          ],
        },
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 2' },
          children: [
            { tag: 'p-multi-select-option', properties: { value: 'g' }, children: ['Option G'] },
            { tag: 'p-multi-select-option', properties: { value: 'h' }, children: ['Option H'] },
            { tag: 'p-multi-select-option', properties: { value: 'i' }, children: ['Option I'] },
          ],
        },
      ],
    },
  ],
};

export const multiSelectStorySlots: Story<'p-multi-select'> = {
  generator: () => [
    {
      tag: 'p-multi-select',
      properties: { name: 'options', state: 'error' },
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
        { tag: 'p-multi-select-option', properties: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-multi-select-option', properties: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-multi-select-option', properties: { value: 'c' }, children: ['Option C'] },
      ],
    },
  ],
};
