'use client';

import type { Story } from '@/components/playground/componentStory';

export const toastStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-toast',
      properties,
    },
  ],
};
