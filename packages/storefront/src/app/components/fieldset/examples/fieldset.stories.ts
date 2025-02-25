'use client';

import type { Story } from '@/models/story';

export const fieldsetStory: Story<'p-fieldset'> = {
  state: {
    properties: { label: 'Some legend label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
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
