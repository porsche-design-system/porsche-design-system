'use client';

import type { Story } from '@/components/playground/componentStory';

export const spinnerStory: Story = {
  state: {
    properties: { aria: { 'aria-label': 'Loading page content' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};
