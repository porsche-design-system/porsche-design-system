'use client';

import type { Story } from '@/models/story';

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
