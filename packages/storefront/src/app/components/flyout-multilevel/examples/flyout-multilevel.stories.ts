'use client';

import type { Story } from '@/models/story';

export const flyoutMultilevelStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flyout-multilevel',
      properties,
    },
  ],
};
