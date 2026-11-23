'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
