'use client';

import type { Story } from '@/components/playground/componentStory';

export const switchStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-switch',
      properties,
      children: ['Some label'],
    },
  ],
};
