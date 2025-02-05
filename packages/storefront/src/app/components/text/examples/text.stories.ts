'use client';

import type { Story } from '@/components/playground/componentStory';

export const textStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
