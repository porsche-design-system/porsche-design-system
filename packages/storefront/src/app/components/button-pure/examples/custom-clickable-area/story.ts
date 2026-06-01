'use client';

import type { Story } from '@/models/story';

export const buttonPureStoryCustomPadding: Story<'p-button-pure'> = {
  state: {
    properties: {
      className: 'p-static-md',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};

