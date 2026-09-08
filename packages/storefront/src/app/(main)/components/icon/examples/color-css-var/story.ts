'use client';

import type { Story } from '@/models/story';

export const iconStoryColorCSSVar: Story<'p-icon'> = {
  state: {
    properties: {
      className: '[--p-icon-color:deeppink]',
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

