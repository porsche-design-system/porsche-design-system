'use client';

import type { Story } from '@/models/story';

export const popoverStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};

export const popoverSlottedButtonStory: Story<'p-popover'> = {
  state: {
    properties: {
      open: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, aria: { 'aria-expanded': false }, icon: 'information', slot: 'button' },
          children: ['More information'],
        },
        'Some additional content.',
      ],
    },
  ],
};
