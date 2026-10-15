'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const toastStory: Story<'p-toast'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-toast',
      properties,
    },
  ],
};

