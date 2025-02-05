'use client';

import type { Story } from '@/components/playground/componentStory';

export const textareaWrapperStory: Story = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea-wrapper',
      properties,
      children: [{ tag: 'textarea', properties: { name: 'some-name' } }],
    },
  ],
};
