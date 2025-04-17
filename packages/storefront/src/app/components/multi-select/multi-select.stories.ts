'use client';

import type { Story } from '@/models/story';

export const multiSelectStory: Story<'p-multi-select'> = {
  state: {
    properties: { name: 'name', label: 'Some Label', description: 'Some description' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-multi-select',
      properties,
      children: [
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
