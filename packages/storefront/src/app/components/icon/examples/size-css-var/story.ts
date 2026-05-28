'use client';

import type { Story } from '@/models/story';

export const iconStorySizeCSSVar: Story<'p-icon'> = {
  state: {
    properties: {
      className: '[--p-icon-size:48px]',
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

