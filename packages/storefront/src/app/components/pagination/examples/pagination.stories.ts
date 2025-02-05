'use client';

import type { Story } from '@/components/playground/componentStory';

export const paginationStory: Story = {
  state: {
    properties: { totalItemsCount: 500, itemsPerPage: 25, activePage: 1 },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-pagination',
      properties,
    },
  ],
};
