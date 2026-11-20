'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const iconStory: Story<'p-icon'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
