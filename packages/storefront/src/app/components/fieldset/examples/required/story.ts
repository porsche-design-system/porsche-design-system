'use client';

import type { Story } from '@/models/story';

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
          properties: { label: 'Some label', name: 'some-name-2', required: true, className: 'mt-fluid-sm' },
        },
      ],
    },
  ],
};

