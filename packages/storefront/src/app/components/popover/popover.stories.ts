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
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, icon: 'car', slot: 'button' },
          children: ['More information'],
        },
        'Some additional content.',
      ],
    },
  ],
};
