'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const spinnerStory: Story<'p-spinner'> = {
  state: {
    properties: { aria: { 'aria-label': 'Loading page content' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};
