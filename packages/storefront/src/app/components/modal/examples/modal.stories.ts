'use client';

import type { Story } from '@/models/story';

export const modalStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: { type: 'button', aria: { 'aria-haspopup': 'dialog' } },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
    },
  ],
};
