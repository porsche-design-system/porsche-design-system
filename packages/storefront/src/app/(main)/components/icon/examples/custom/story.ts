'use client';

import type { Story } from '@/models/story';

export const iconStoryCustom: Story<'p-icon'> = {
  state: {
    properties: {
      source: 'assets/icon-custom-kaixin.svg',
      aria: { 'aria-label': 'Icon for social media platform Kaixin' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

