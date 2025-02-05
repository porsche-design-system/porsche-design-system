'use client';

import type { Story } from '@/components/playground/componentStory';

export const dividerStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-divider',
      properties,
    },
  ],
};
