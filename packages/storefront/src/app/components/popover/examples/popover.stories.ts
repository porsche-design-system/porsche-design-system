'use client';

import type { Story } from '@/components/playground/componentStory';

export const popoverStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};
