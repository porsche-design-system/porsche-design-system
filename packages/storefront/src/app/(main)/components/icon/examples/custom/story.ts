'use client';

import type { Story } from '@porsche-design-system/story-generator';

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

