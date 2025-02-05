'use client';

import type { Story } from '@/components/playground/componentStory';

export const buttonStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties,
      children: ['Some label'],
    },
  ],
};
