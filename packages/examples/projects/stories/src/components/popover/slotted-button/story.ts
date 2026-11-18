'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
