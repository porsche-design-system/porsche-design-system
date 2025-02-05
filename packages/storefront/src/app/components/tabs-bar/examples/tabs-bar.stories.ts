'use client';

import type { Story } from '@/components/playground/componentStory';

export const tabsBarStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tabs-bar',
      properties,
    },
  ],
};
