'use client';

import type { Story } from '@/models/story';

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

