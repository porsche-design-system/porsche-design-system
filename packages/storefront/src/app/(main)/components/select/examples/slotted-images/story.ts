'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

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

