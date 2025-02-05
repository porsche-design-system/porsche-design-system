'use client';

import type { Story } from '@/components/playground/componentStory';

export const tagStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag',
      properties,
      children: ['Some label'],
    },
  ],
};
