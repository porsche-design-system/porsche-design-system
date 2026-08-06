'use client';

import type { Story } from '@/models/story';

export const popoverSlottedButtonStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [
        {
          tag: 'p-button',
          properties: { slot: 'button' },
          children: ['More information'],
        },
        'Some additional content.',
      ],
    },
  ],
};
