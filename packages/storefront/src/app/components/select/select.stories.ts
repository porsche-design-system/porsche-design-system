'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

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
