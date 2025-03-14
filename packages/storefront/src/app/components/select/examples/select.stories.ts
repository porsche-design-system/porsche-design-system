'use client';

import type { Story } from '@/models/story';

export const selectStory: Story<'p-select'> = {
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
