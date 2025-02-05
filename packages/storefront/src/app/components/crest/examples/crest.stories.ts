'use client';

import type { Story } from '@/components/playground/componentStory';

export const crestStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};
