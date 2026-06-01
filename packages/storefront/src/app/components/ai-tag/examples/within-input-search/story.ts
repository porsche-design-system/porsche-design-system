'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithInputSearch: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-input-search',
      properties: { label: "What's your favorite Fruit", description: 'Search for fruits', name: 'search' },
      children: [
        {
          tag: 'p-ai-tag',
          properties: {
            slot: 'end',
            variant: 'abbreviation',
          },
        },
      ],
    },
  ],
};

