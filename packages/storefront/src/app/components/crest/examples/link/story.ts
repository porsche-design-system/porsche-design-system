'use client';

import type { Story } from '@/models/story';

export const crestStoryLink: Story<'p-crest'> = {
  state: {
    properties: { href: 'https://porsche.com', aria: { 'aria-label': 'Porsche Homepage' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};

