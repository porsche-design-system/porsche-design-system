'use client';

import type { Story } from '@/components/playground/componentStory';

export const headingStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-heading',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
