'use client';

import type { Story } from '@porsche-design-system/story-generator';

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

