'use client';

import type { Story } from '@/components/playground/componentStory';

export const headlineStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-headline',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
