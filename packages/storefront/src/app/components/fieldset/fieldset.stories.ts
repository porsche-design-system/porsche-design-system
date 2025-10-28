'use client';

import type { SlotStories, Story } from '@/models/story';

export const fieldsetSlotStories: SlotStories<'p-fieldset'> = {
  label: {
    'slotted-label': {
      name: 'Slotted label',
      generator: ({ properties } = {}) => [
        { tag: 'span', properties: { slot: 'label' }, children: [properties?.label] },
      ],
    },
  },
  message: {
    'slotted-message': {
      name: 'Slotted message',
      generator: ({ properties } = {}) => [
        { tag: 'span', properties: { slot: 'message' }, children: [properties?.message] },
      ],
    },
  },
};

export const fieldsetStory: Story<'p-fieldset'> = {
  state: {
    properties: { label: 'Some legend label' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-fieldset',
      properties: Object.fromEntries(
        Object.entries(properties ?? {}).filter(([name]) => {
          if (slots?.label?.name === 'Slotted label') {
            return name !== 'label';
          }
          if (slots?.message?.name === 'Slotted message') {
            return name !== 'message';
          }
          return true;
        })
      ),
      children: [
        ...(slots?.label?.generator(
          slots?.label.name === 'Slotted label' ? { properties: { label: properties?.label } } : undefined
        ) ?? []),
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name' },
        },
        ...(slots?.message?.generator(
          slots?.message.name === 'Slotted message' ? { properties: { message: properties?.message } } : undefined
        ) ?? []),
      ],
    },
  ],
};

export const fieldsetStorySlottedLabel: Story<'p-fieldset'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
      properties,
      children: [
        { tag: 'span', properties: { slot: 'label' }, children: ['Some legend label'] },
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name' },
        },
      ],
    },
  ],
};

export const fieldsetStorySlottedMessage: Story<'p-fieldset'> = {
  state: {
    properties: { label: 'Some legend label', state: 'error' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
      properties,
      children: [
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name' },
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: ['Some error message'],
        },
      ],
    },
  ],
};

export const fieldsetStoryRequiredRadio: Story<'p-fieldset'> = {
  state: {
    properties: {
      label: 'Some legend label',
      required: true,
      aria: { role: 'radiogroup' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
      properties,
      children: [
        {
          tag: 'p-radio-group',
          properties: { label: 'Some label', name: 'some-name' },
          children: [
            { tag: 'p-radio-group-option', properties: { value: 'a', label: 'Option A' } },
            { tag: 'p-radio-group-option', properties: { value: 'b', label: 'Option B' } },
            { tag: 'p-radio-group-option', properties: { value: 'c', label: 'Option C' } },
          ],
        },
      ],
    },
  ],
};

export const fieldsetStoryRequired: Story<'p-fieldset'> = {
  state: {
    properties: {
      label: 'Some legend label',
      required: true,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
      properties,
      children: [
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name-1', required: true },
        },
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name-2', required: true },
        },
      ],
    },
  ],
};
