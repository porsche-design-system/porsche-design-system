'use client';

import type { Story } from '@/components/playground/componentStory';

export const marqueStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-marque',
      properties,
    },
  ],
};
