'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const tagStory: Story<'p-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag',
      properties,
      children: ['Some label'],
    },
  ],
};

