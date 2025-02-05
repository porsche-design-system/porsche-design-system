'use client';

import type { Story } from '@/components/playground/componentStory';

export const wordmarkStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};
