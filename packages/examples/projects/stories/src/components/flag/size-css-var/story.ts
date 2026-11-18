'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const flagStorySizeCSSVar: Story<'p-flag'> = {
  state: {
    properties: {
      className: '[--p-flag-size:48px]',
      name: 'de',
      aria: { 'aria-label': 'Flag of Germany' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties,
    },
  ],
};
