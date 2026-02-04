'use client';

import type { Story, SlotStories } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

export const selectSlotStories: SlotStories<'p-select'> = {
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

export const selectStorySlottedImages: Story<'p-select'> = {
  state: {
    properties: {
      name: 'options',
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-select',
      properties,
      children: [
        ...(['718', '911', 'taycan', 'macan', 'cayenne', 'panamera'].map((model) => ({
          tag: 'p-select-option',
          properties: { value: model },
          children: [{ tag: 'img', properties: { src: `assets/${model}.png` } }, model],
        })) as ElementConfig<'p-select-option'>[]),
      ],
    },
  ],
};

export const selectStoryOptgroups: Story<'p-select'> = {
  state: {
    properties: {
      name: 'options',
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-select',
      properties,
      children: [
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 1' },
          children: [
            { tag: 'p-select-option', properties: { value: 'a' }, children: ['Option A'] },
            { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
            { tag: 'p-select-option', properties: { value: 'c' }, children: ['Option C'] },
            { tag: 'p-select-option', properties: { value: 'd' }, children: ['Option D'] },
            { tag: 'p-select-option', properties: { value: 'e' }, children: ['Option E'] },
            { tag: 'p-select-option', properties: { value: 'f' }, children: ['Option F'] },
          ],
        },
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 2' },
          children: [
            { tag: 'p-select-option', properties: { value: 'g' }, children: ['Option G'] },
            { tag: 'p-select-option', properties: { value: 'h' }, children: ['Option H'] },
            { tag: 'p-select-option', properties: { value: 'i' }, children: ['Option I'] },
          ],
        },
      ],
    },
  ],
};

export const selectStorySlots: Story<'p-select'> = {
  generator: () => [
    {
      tag: 'p-select',
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
        { tag: 'p-select-option', properties: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-select-option', properties: { value: 'c' }, children: ['Option C'] },
      ],
    },
  ],
};
