'use client';

import type { Story } from '@/models/story';

export const fieldsetWrapperStory: Story<'p-fieldset-wrapper'> = {
  state: {
    properties: { label: 'Some legend label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset-wrapper',
      properties,
      children: [
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label' },
          children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
        },
      ],
    },
  ],
};

export const fieldsetWrapperStorySlottedLabel: Story<'p-fieldset-wrapper'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset-wrapper',
      properties,
      children: [
        { tag: 'span', properties: { slot: 'label' }, children: ['Some legend label'] },
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label' },
          children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
        },
      ],
    },
  ],
};

export const fieldsetWrapperStorySlottedMessage: Story<'p-fieldset-wrapper'> = {
  state: {
    properties: { label: 'Some legend label', state: 'error' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset-wrapper',
      properties,
      children: [
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label' },
          children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
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
