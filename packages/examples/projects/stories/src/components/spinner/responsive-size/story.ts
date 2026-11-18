'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const spinnerStoryResponsiveSize: Story<'p-spinner'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};
