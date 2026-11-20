'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const crestStory: Story<'p-crest'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};
