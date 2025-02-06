'use client';

import type { Story } from '@/models/story';

export const checkboxWrapperStory: Story = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'checkbox', name: 'some-name' } }],
    },
  ],
};
