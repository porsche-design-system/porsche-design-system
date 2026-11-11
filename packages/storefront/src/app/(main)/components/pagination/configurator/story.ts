'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const paginationStory: Story<'p-pagination'> = {
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

