'use client';

import type { Story } from '@/components/playground/componentStory';

export const textFieldWrapperStory: Story = {
  state: { properties: { label: 'Some label' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text-field-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
    },
  ],
};
