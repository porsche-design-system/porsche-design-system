'use client';

import type { Story } from '@/models/story';

export const crestStoryCustomPadding: Story<'p-crest'> = {
  state: {
    properties: { href: 'https://porsche.com', className: 'p-static-md', aria: { 'aria-label': 'Porsche Homepage' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};

