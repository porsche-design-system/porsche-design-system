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
