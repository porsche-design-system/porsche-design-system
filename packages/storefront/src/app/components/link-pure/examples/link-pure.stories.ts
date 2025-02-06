'use client';

import type { Story } from '@/models/story';

export const linkPureStory: Story = {
  state: {
    properties: { href: 'https://porsche.com' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-pure',
      properties,
      children: ['Some label'],
    },
  ],
};
