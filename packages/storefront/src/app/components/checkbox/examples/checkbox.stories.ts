'use client';

import type { Story } from '@/components/playground/componentStory';

export const checkboxStory: Story = {
  state: {
    properties: { label: 'Some label', name: 'some-name' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
    },
  ],
};
