'use client';

import type { Story } from '@/components/playground/componentStory';

export const flyoutMultilevelStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flyout-multilevel',
      properties,
    },
  ],
};
