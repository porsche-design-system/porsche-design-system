'use client';

import type { Story } from '@/components/playground/componentStory';

export const pinCodeStory: Story = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-pin-code',
      properties,
    },
  ],
};
