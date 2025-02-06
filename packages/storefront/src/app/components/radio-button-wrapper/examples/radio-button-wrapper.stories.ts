'use client';

import type { Story } from '@/models/story';

export const radioButtonWrapperStory: Story = {
  state: {
    properties: {
      label: 'Some label',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-radio-button-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
    },
    {
      tag: 'p-radio-button-wrapper',
      properties: {
        label: 'Some label',
      },
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
    },
  ],
};
