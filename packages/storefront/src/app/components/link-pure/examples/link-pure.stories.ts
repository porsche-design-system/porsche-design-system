'use client';

import type { Story } from '@/models/story';

export const linkPureStory: Story<'p-link-pure'> = {
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
