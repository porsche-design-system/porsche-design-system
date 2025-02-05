'use client';

import type { Story } from '@/components/playground/componentStory';

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
