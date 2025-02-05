'use client';

import type { Story } from '@/components/playground/componentStory';

export const tagDismissibleStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag-dismissible',
      properties,
      children: ['Some label'],
    },
  ],
};
