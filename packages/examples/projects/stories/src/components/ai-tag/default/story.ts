'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const aiTagStory: Story<'p-ai-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-ai-tag',
      properties,
      children: [],
    },
  ],
};
