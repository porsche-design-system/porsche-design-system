'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const wordmarkStory: Story<'p-wordmark'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};

