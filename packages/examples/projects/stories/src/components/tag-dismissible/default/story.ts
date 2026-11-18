'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const tagDismissibleStory: Story<'p-tag-dismissible'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag-dismissible',
      properties,
      children: ['Some label'],
    },
  ],
};
