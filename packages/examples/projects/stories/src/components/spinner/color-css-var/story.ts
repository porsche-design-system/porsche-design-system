'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const spinnerStoryColorCSSVar: Story<'p-spinner'> = {
  state: {
    properties: {
      className: '[--p-spinner-color:deeppink] [--p-spinner-track-color:lightpink]',
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
