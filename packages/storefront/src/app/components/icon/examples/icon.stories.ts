'use client';

import type { Story } from '@/components/playground/componentStory';

export const iconStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
