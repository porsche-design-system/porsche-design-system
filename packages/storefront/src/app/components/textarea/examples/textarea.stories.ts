'use client';

import type { Story } from '@/components/playground/componentStory';

export const textareaStory: Story = {
  state: {
    properties: { name: 'some-name', label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea',
      properties,
    },
  ],
};
