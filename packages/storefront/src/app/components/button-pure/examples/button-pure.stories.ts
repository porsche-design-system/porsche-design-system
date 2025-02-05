'use client';

import type { Story } from '@/components/playground/componentStory';

export const buttonPureStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};
