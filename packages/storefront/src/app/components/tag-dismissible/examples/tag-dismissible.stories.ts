'use client';

import type { Story } from '@/models/story';

export const tagDismissibleStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag-dismissible',
      properties,
      children: ['Some label'],
    },
  ],
};
