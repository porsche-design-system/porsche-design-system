'use client';

import type { Story } from '@/models/story';

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
