'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const iconStoryResponsiveSize: Story<'p-icon'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
