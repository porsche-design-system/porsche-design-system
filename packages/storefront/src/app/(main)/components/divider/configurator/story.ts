'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const dividerStory: Story<'p-divider'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-divider',
      properties,
    },
  ],
};

